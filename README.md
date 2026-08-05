# Abraham Kaunda — IT Portfolio

A lightweight, recruiter-facing portfolio presenting my background in IT support, networking, infrastructure and automation.

## Featured content

- Computer Science graduate profile
- Layer 2/3 networking, pfSense, Python, Ansible and virtualisation skills
- Final-year pfSense firewall configuration and evaluation project
- Responsive, accessible layout for desktop and mobile

## Technology

The site deliberately uses plain HTML and CSS. It has no framework, package manager, database, server-side code or external runtime dependency. This keeps the source easy to inspect and makes it portable across GitHub Pages and other static hosts.

## Project structure

```text
.
├── .github/workflows/deploy-pages.yml  # Automatic GitHub Pages deployment
├── assets/favicon.svg                  # Browser icon
├── .nojekyll                           # Serve files without Jekyll processing
├── index.html                          # Site structure and content
├── styles.css                          # Design and responsive layout
└── README.md                           # Project documentation
```

## Run locally

No installation is required. Either open `index.html` directly in a browser or serve the directory locally:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy with GitHub Pages

1. Create a new GitHub repository and place these files at its root.
2. Push the repository to the `main` branch.
3. Open **Settings → Pages** in GitHub.
4. Under **Build and deployment**, select **GitHub Actions** as the source.
5. Open the **Actions** tab to follow the deployment. Later pushes to `main` will update the site automatically.

The included workflow follows GitHub's supported Pages deployment process.

## Content accuracy

The portfolio is intentionally limited to skills and project work I can discuss honestly in a technical interview. It does not claim certifications, employers or achievements that are not part of my background.

## Contact

Abraham Kaunda  
London, United Kingdom  
[abrahamkaunda@gmail.com](mailto:abrahamkaunda@gmail.com)
