import { Link, Trans, useI18next } from "gatsby-plugin-react-i18next";
import Typography from "@mui/material/Typography";

import { PathConfig } from "shared/interface";
import { docs } from "../../../docs/docs.json";
import { Important } from "components/MDXComponents";

interface Props {
  name: string;
  pathConfig: PathConfig;
  availIn: string[];
}

export function CustomNotice({ name, pathConfig, availIn }: Props) {
  const docConfig = docs[pathConfig.repo] as {
    deprecated?: string[];
    stable: string;
    dmr?: string[];
  };

  const { language } = useI18next();

  const isDeprecated =
    docConfig.deprecated?.includes(pathConfig.version || "") ?? false;
  const isDmr = docConfig.dmr?.includes(pathConfig.version || "") ?? false;

  const stableDocLink = availIn.includes("stable")
    ? `/${pathConfig.repo}/stable/${name === "_index" ? "" : name}`
    : `/${pathConfig.repo}/stable`;

  const dmrDesc = `/tidb/${pathConfig.version}/versioning`;

  if (isDeprecated) {
    return (
      <>
        <Important>
          <Typography>
            <Trans
              i18nKey={`doc.deprecation.${pathConfig.repo}.firstContext`}
              values={{
                curDocVersion: pathConfig.version,
              }}
            />
            {(language === "en" && ` `) || null}
            <Trans
              i18nKey={`doc.deprecation.${pathConfig.repo}.secondContext`}
              components={[<Link to={stableDocLink} />]}
              values={{
                stableVersion: docConfig.stable,
              }}
            />
          </Typography>
        </Important>
      </>
    );
  } else if (isDmr) {
    return (
      <>
        <Important>
          <Typography>
            <Trans
              i18nKey={`doc.dmr.${pathConfig.repo}.firstContext`}
              components={[<Link to={dmrDesc} />]}
              values={{
                curDocVersion: pathConfig.version,
              }}
            />
            {(language === "en" && ` `) || null}
            <Trans
              i18nKey={`doc.dmr.${pathConfig.repo}.secondContext`}
              components={[<Link to={stableDocLink} />]}
              values={{
                stableVersion: docConfig.stable,
              }}
            />
          </Typography>
        </Important>
      </>
    );
  }

  return null;
}
