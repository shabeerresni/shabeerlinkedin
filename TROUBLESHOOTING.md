# Troubleshooting Guide

## Content Not Loading?

If you see blank sections or an error message, here are the most common causes and solutions:

### Issue 1: CORS Error (Most Common)
**Symptom**: Content doesn't load, console shows "CORS policy" or "Failed to fetch" error

**Cause**: Opening `index.html` directly in browser (file:// protocol) blocks JSON file loading

**Solution**: Use a local web server:

```bash
# Option 1: Python 3
python3 -m http.server 8000

# Option 2: Python 2
python -m SimpleHTTPServer 8000

# Option 3: Node.js (if installed)
npx http-server

# Option 4: PHP (if installed)
php -S localhost:8000
```

Then open: `http://localhost:8000` in your browser

### Issue 2: JSON File Not Found
**Symptom**: 404 error in console

**Solution**: Make sure `profileData.json` is in the same directory as `index.html`

### Issue 3: JavaScript Errors
**Symptom**: Console shows JavaScript errors

**Solution**: 
1. Open browser Developer Tools (F12)
2. Check Console tab for errors
3. Make sure all script files are loading:
   - `js/main.js`
   - `js/utils/theme.js`
   - `js/utils/animations.js`

### Issue 4: Network Issues
**Symptom**: External resources (Tailwind, Lucide, AOS) not loading

**Solution**: Check your internet connection. All external libraries load from CDN.

## Quick Test

1. Open terminal in project directory
2. Run: `python3 -m http.server 8000`
3. Open browser: `http://localhost:8000`
4. Check browser console (F12) for any errors

## Still Having Issues?

Check the browser console (F12 → Console tab) and look for:
- Red error messages
- Failed network requests
- Missing file errors

The website will show a red error banner if it can't load the JSON file, with instructions to use a local server.

