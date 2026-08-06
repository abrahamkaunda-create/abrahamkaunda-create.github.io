# Abraham Kaunda — Computer Science Portfolio

A responsive portfolio presenting my technical interests, practical projects and ongoing development as a Computer Science graduate.

**Live website:** [abrahamkaunda-create.github.io](https://abrahamkaunda-create.github.io/)

## Projects

### Personal portfolio website

A responsive static website built to present my work clearly to recruiters and hiring managers. It includes accessible navigation, a persistent dark-mode preference and a layout designed for desktop and mobile devices.

### IT Operations Toolkit

A live multipage Python and Streamlit application containing an IPv4 subnet calculator, deterministic text-log analyser and transparent support-ticket prioritiser. Reusable logic is separated from the interface and covered by 30 unit tests.

[Open the live toolkit](https://it-operations-toolkit-apygrmvbleecnclt6dmgfc.streamlit.app/) · [View the source repository](https://github.com/abrahamkaunda-create/it-operations-toolkit)

### pfSense network security case study

A recruiter-facing summary of my final-year university project examining pfSense in a virtualised network laboratory. The retained evidence shows a VMware-hosted pfSense Community Edition instance, WAN/LAN/LAN2 interfaces, DHCP configuration and the submitted network topology.

The case study also discusses the wider firewall, NAT, VPN, IDS/IPS, usability and performance areas documented in the project report while clearly identifying the limits of the surviving evidence.

## Technologies

Portfolio website:

- HTML5
- CSS3
- Vanilla JavaScript
- GitHub Actions and GitHub Pages

Linked toolkit project:

- Python
- Streamlit
- Standard-library unit testing

The portfolio itself remains a static website with no frontend framework, package manager, database or server-side dependency.

## Project structure

```text
.
├── .github/workflows/deploy-pages.yml  # GitHub Pages deployment workflow
├── assets/
│   ├── favicon.svg                     # Website icon
│   ├── pfsense-dhcp.png                # Retained DHCP configuration screenshot
│   └── pfsense-topology.png            # Submitted network topology diagram
├── .nojekyll                           # Disables Jekyll processing
├── index.html                          # Main portfolio page
├── pfsense-project.html                # pfSense project case study
├── script.js                           # Dark-mode preference and controls
├── styles.css                          # Design and responsive layout
└── README.md                           # Repository documentation
```

## Run locally

No installation is required. From the repository directory, run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## Deployment

Changes pushed to the `main` branch are published to GitHub Pages through the included GitHub Actions workflow.

## Contact

**Abraham Kaunda**  
London, United Kingdom  
[abrahamkaunda@gmail.com](mailto:abrahamkaunda@gmail.com)
