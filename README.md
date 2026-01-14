# Unearthed Wisconsin

An interactive educational web app for exploring Wisconsin's Native American effigy mound archaeological sites.

**Created by the FLL Athletic Technics team from Hartford, WI** for their FIRST LEGO League Innovation project.

## Featured Sites

- 🏔️ **High Cliff** - Dramatic views above Lake Winnebago
- 🦎 **Lizard Mound** - One of the most well-preserved effigy mound sites in the nation
- 🏊 **Pike Lake** - Southeast Wisconsin lake with burial and effigy mounds
- 🏛️ **Aztalan State Park** - One of Wisconsin's most famous ancient Mississippian sites
- 🐢 **Koshkonong Effigy Mounds** - Features a 222-foot Turtle Mound

## Features

- Interactive map with clickable location hotspots
- Educational facts about Late Woodland and Mississippian cultures
- Adventure checklists for on-site exploration
- Badge collection system (22 total badges)
- Personalized Explorer Certificate
- Etiquette guide for respectful site visits

---

## 🐳 Docker Deployment

### Quick Start

```bash
# Build and run the container
docker compose up -d

# View logs
docker compose logs -f

# Stop the container
docker compose down
```

The app will be available at **http://localhost:3000**

### With ngrok (Public Access)

After starting the Docker container:

```bash
# Option 1: Quick one-liner (no account needed for short sessions)
ngrok http 3000

# Option 2: With a custom subdomain (requires ngrok account)
ngrok http 3000 --subdomain=unearthed-wisconsin
```

ngrok will provide a public URL like `https://abc123.ngrok.io` that anyone can access.

### Manual Docker Commands

```bash
# Build the image
docker build -t unearthed-wisconsin .

# Run the container
docker run -d -p 8080:80 --name unearthed-wisconsin unearthed-wisconsin

# Stop and remove
docker stop unearthed-wisconsin && docker rm unearthed-wisconsin
```

---

## 🛠️ Local Development

Since this is a static site, you can serve it with any HTTP server:

```bash
# Python 3
python3 -m http.server 8080

# Node.js (npx)
npx serve -p 8080

# PHP
php -S localhost:8080
```

Then open http://localhost:8080 in your browser.

---

## Tech Stack

- **React 18** (loaded from CDN)
- **Babel** (in-browser JSX transformation)
- **Pure CSS** (custom styling, no framework)
- **LocalStorage** (progress persistence)
- **Canvas API** (certificate generation)

## Project Structure

```
UnearthedWisconsin/
├── index.html          # Complete React app (single file)
├── cover.png           # Main map image
├── Certificate.png     # Certificate background
├── Aztalan1.png        # Location photos...
├── Aztalan2.png
├── Highcliff1.png
├── Highcliff2.png
├── LizardMound.png
├── LizardMoundMap.png
├── Dock.png
├── Lake.png
├── Sign.png
├── hike.png
├── Dockerfile          # Docker deployment
├── docker-compose.yml  # Docker Compose config
└── README.md           # This file
```

---

## License

Educational project - created for FLL Innovation Project.
