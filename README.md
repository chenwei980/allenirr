# IRR Calculator

A web-based Internal Rate of Return (IRR) calculator for financial analysis.

## Features
- Calculate IRR for multiple cash flows
- Add/remove cash flow entries dynamically
- Responsive design for mobile and desktop
- Visual feedback for results and errors
- Simple and intuitive user interface

## How to Use
1. Enter the initial investment (usually negative) and subsequent cash flows
2. Click "Add Cash Flow" to add more cash flow entries if needed
3. Click "Calculate IRR" to compute the internal rate of return
4. View the result as a percentage

## Publishing to GitHub Pages

To publish this calculator to GitHub Pages, follow these detailed steps:

### 1. Create a GitHub Repository
1. Go to [GitHub](https://github.com) and log in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Enter a repository name (e.g., "irr-calculator")
4. Add a description (optional)
5. Choose repository visibility (public or private)
6. Do not initialize the repository with a README, .gitignore, or license
7. Click "Create repository"

### 2. Link Your Local Repository to GitHub
1. Copy the repository URL from GitHub (it will look like `https://github.com/your-username/irr-calculator.git`)
2. Open Terminal and navigate to your project folder:
   ```bash
   cd /Users/allenchen/Documents/trae/test IRR
   ```
3. Link your local repository to the remote GitHub repository:
   ```bash
   git remote add origin https://github.com/your-username/irr-calculator.git
   ```

### 3. Push Your Code to GitHub
1. Push your code to the GitHub repository:
   ```bash
   git push -u origin main
   ```
2. When prompted for credentials:
   - For username: enter your GitHub username
   - For password: it's recommended to use a **Personal Access Token** instead of your password
     - To create a token: go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
     - Click "Generate new token"
     - Select scopes (at least "repo" access)
     - Copy the token and use it as your password

### 4. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on "Settings" in the top navigation
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "main" branch from the dropdown menu
5. **Important:** If your files are in a subdirectory (like `allenirr/`), click the dropdown that says "/(root)" and select "/allenirr"
6. Click "Save"
7. Wait a few minutes for GitHub to build and publish your site
8. Your IRR Calculator will be available at: `https://your-username.github.io/irr-calculator/`

## Local Development
1. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```
2. Open your browser and visit: [http://localhost:8000](http://localhost:8000)

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Git & GitHub Pages