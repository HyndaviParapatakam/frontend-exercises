# Frontend Micro-Frontend Project with Helm & AWS EKS Deployment

This repository contains a complete micro-frontend-based architecture implemented using React (shell-app and frontend-exercises), with deployment pipelines configured using GitHub Actions, Docker, Helm, and AWS EKS.

---

## 📁 Folder Structure

```
Coding_test_React/
│
├── frontend-repos/
│   ├── shell-app/                  # Shell container (host) for micro frontends with SSR
│   └── frontend-exercises/        # React micro-frontend exposed via Module Federation
│
├── helm-deployment/
│   ├── shell-app-helm/            # Helm chart for shell-app deployment
│   └── frontend-exercises-helm/   # Helm chart for frontend-exercises deployment
```

---

## 🛠️ Features

- **Micro-Frontend Architecture** using Webpack Module Federation
- **SSR** support in shell-app
- **Dynamic routing & lazy loading**
- **Helm post-upgrade hooks** for S3 uploads and CDN cache busting
- **GitHub Actions** for CI/CD
- **AWS EKS** for hosting with LoadBalancer support

---

## How to Run Locally

### 1. Shell App

```bash
cd frontend-repos/shell-app
npm install
npm run dev             # For CSR
npm run build           # Build SSR bundle
npm run start:ssr       # Start SSR server
```
Open [http://localhost:4000](http://localhost:4000) to view it in the browser.

### 2. Frontend Exercises App

```bash
cd frontend-repos/frontend-exercises
npm install
npm start               # Start dev server
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
---

## ☁️ Deploy to AWS EKS

1. Configure `KUBE_CONFIG_DATA`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `DOCKER_USERNAME`, `DOCKER_PASSWORD`, `S3_BUCKET`, and `CLOUDFRONT_DIST_ID` in GitHub secrets.
2. Push changes to `main` branch to trigger GitHub Actions workflows.
3. Helm charts automatically deploy updated services to AWS.

---

## 📦 Helm Chart Configuration

Each chart has the following structure:

```
helm-deployment/
  └── <app-name>-helm/
      ├── templates/
      ├── values.yaml
      └── Chart.yaml
```

Key `values.yaml` fields:

```yaml
service:
  enabled: true
  type: LoadBalancer
  port: 80

image:
  repository: hyndav/<app-name>
  tag: latest

aws:
  secretName: aws-credentials
  configMapName: s3-config
```

---

## ✅ Completed Exercises

✅ JavaScript & TypeScript  
✅ React Custom Hooks, Memoization, Virtualization  
✅ Micro-Frontend Architecture  
✅ SSR + Lazy Loading  
✅ Helm Chart Deployment  
✅ CI/CD with GitHub Actions  
✅ AWS EKS Deployment with LoadBalancer

---

## Screenshots

Include screenshots inside a `/screenshots` folder if needed.

---

## 👩‍💻 Author

**Hyndavi Reddy Parapatakam**  
Senior Frontend Engineer | React | Angular | Helm | AWS | Micro-Frontends  
p.hyndavireddy@gmail.com

---