# Personal Portfolio Website

A modern, responsive portfolio website built with HTML5, Tailwind CSS, and vanilla JavaScript. This portfolio dynamically loads content from a JSON file and features smooth animations, dark mode, and a clean minimalist design.

## Features

- ✅ **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- ✅ **Dark/Light Mode**: Toggle between themes with persistent preference
- ✅ **Smooth Animations**: AOS (Animate On Scroll) library for elegant transitions
- ✅ **Dynamic Content**: Loads all content from `profileData.json`
- ✅ **Modern UI**: Clean, minimalist design using Tailwind CSS
- ✅ **Smooth Scrolling**: Native smooth scroll navigation
- ✅ **Social Links**: Clickable LinkedIn, GitHub, and Email links
- ✅ **Contact Form**: Email form (opens default email client)

## Project Structure

```
Linkedin2/
├── index.html              # Main HTML file
├── profileData.json        # Profile data (edit this to update content)
├── styles/
│   └── main.css           # Custom CSS styles
├── js/
│   ├── main.js            # Main JavaScript logic
│   └── utils/
│       ├── theme.js       # Dark/light mode toggle
│       └── animations.js  # Scroll animations
└── README.md              # This file
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, but recommended)

### Installation

1. **Clone or download this repository**
   ```bash
   git clone <your-repo-url>
   cd Linkedin2
   ```

2. **Update your profile data**
   - Open `profileData.json`
   - Edit the content with your information:
     - Name, headline, location
     - About section
     - Experience entries
     - Skills and domain expertise
     - Education
     - Projects
     - Social links (LinkedIn, GitHub, Email)

3. **Open the website**
   - Option 1: Open `index.html` directly in your browser
   - Option 2: Use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if you have http-server installed)
     npx http-server
     
     # Using PHP
     php -S localhost:8000
     ```
   - Then visit `http://localhost:8000` in your browser

## Customization

### Updating Content

All content is stored in `profileData.json`. Simply edit this file to update your portfolio:

- **Name & Headline**: Update `name` and `headline` fields
- **Photo**: Update `photoUrl` with your image URL or use a placeholder
- **About**: Edit the `about` text (supports line breaks with `\n`)
- **Experience**: Add/remove entries in the `experience` array
- **Skills**: Modify the `skills` array
- **Education**: Update the `education` array
- **Projects**: Add projects to the `projects` array
- **Social Links**: Update URLs in `socialLinks`

### Styling

- **Colors**: Modify Tailwind classes in `index.html` or add custom colors in `styles/main.css`
- **Fonts**: Add Google Fonts link in `index.html` `<head>` section
- **Animations**: Adjust AOS settings in `js/main.js` (AOS.init configuration)

### Adding EmailJS (Optional)

To enable the contact form to send emails directly:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Add EmailJS script to `index.html`:
   ```html
   <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
   ```
4. Update the form handler in `js/main.js` to use EmailJS API

## Deployment

### GitHub Pages

1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Portfolio website"
   ```

2. **Push to GitHub**:
   ```bash
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository settings on GitHub
   - Navigate to "Pages" section
   - Select `main` branch and `/ (root)` folder
   - Click "Save"
   - Your site will be live at `https://<username>.github.io/<repo-name>`

### Other Hosting Options

- **Netlify**: Drag and drop your folder or connect GitHub repo
- **Vercel**: Connect GitHub repo for automatic deployments
- **Cloudflare Pages**: Connect GitHub repo
- **Any static hosting service**: Upload all files to your hosting provider

## Git Commands Reference

```bash
# Initialize repository
git init

# Add all files
git add .

# Commit changes
git commit -m "Your commit message"

# Add remote repository (replace with your GitHub URL)
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main

# For subsequent updates
git add .
git commit -m "Update portfolio content"
git push
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Technologies Used

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Vanilla JavaScript**: No frameworks, pure JS
- **AOS Library**: Animate On Scroll library
- **Lucide Icons**: Beautiful icon library

## License

This project is open source and available for personal use.

## Contact

For questions or suggestions, feel free to reach out via LinkedIn or GitHub (links in the portfolio).

---

Built with ❤️ using modern web technologies

