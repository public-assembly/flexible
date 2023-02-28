import React from "react";
import { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: <span>Flexible</span>,
  project: {
    link: "https://github.com/public-assembly/flexible",
  },
  chat: {
    link: "https://forum.public---assembly.com/",
    icon: (
      <svg width="24" height="24">
        <path
          fill="white"
          d="M 12.1016 0 C 18.6641 0 24 5.48438 24 11.9961 C 24 18.5078 18.6719 23.9883 12.1016 23.9883 L 0 24 L 0 11.7891 C 0 5.28125 5.53125 0 12.1016 0 Z M 12.2188 4.5625 C 9.62891 4.55859 7.22266 5.91406 5.88281 8.13281 C 4.55078 10.3438 4.49609 13.0898 5.73438 15.3516 L 4.39844 19.6094 L 9.19531 18.5352 C 11.9375 19.7617 15.1484 19.2148 17.3281 17.1445 C 19.5 15.0938 20.1914 11.918 19.0664 9.14844 C 17.9336 6.37109 15.2266 4.55859 12.2266 4.5625 Z M 12.2188 4.5625"
        />
      </svg>
    ),
  },
  docsRepositoryBase:
    "https://github.com/public-assembly/flexible-docs/blob/main/",
  footer: {
    text: "Built by PA",
  },

  useNextSeoProps() {
    return {
      titleTemplate: "%s",
    };
  },

  sidebar: {
    defaultMenuCollapseLevel: 4,
  },
};
export default config;
