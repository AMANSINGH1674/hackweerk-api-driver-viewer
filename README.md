# 🐕 Dog API Viewer

A simple and elegant web application that fetches and displays dog images from the Dog CEO API. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- **Dynamic Data Fetching**: Retrieves dog images from the Dog CEO API
- **Breed Filtering**: Filter dogs by specific breeds using a dropdown selector
- **Search Functionality**: Search for dogs by breed name with real-time filtering
- **Refresh Button**: Load new random dog images with a single click
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Loading States**: Smooth loading indicators for better user experience

## 🚀 Live Demo

\`\`\`
# Deploy to Vercel (recommended)
Click the "Deploy" button in the top-right corner of the preview

# Or deploy to other platforms
npm run build
npm run start
\`\`\`

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful and accessible UI components
- **Dog CEO API** - Free dog images API

## 📡 API Information

This app uses the [Dog CEO Dog API](https://dog.ceo/dog-api/), a free public API that provides:

- Random dog images
- Images filtered by breed
- List of all available dog breeds
- Sub-breed support

### API Endpoints Used:

- \`GET https://dog.ceo/api/breeds/list/all\` - Get all available breeds
- \`GET https://dog.ceo/api/breeds/image/random/{count}\` - Get random dog images
- \`GET https://dog.ceo/api/breed/{breed}/images\` - Get images for specific breed

## 🏃‍♂️ How to Run Locally

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd dog-api-viewer
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to \`http://localhost:3000\`

## 🎯 How It Works

1. **Initial Load**: The app fetches a list of all available dog breeds and displays 8 random dog images
2. **Breed Selection**: Users can select a specific breed from the dropdown to see only dogs of that breed
3. **Search**: Users can type in the search box to filter displayed dogs by breed name
4. **Refresh**: The refresh button loads new images based on the current filter settings
5. **Responsive Grid**: Images are displayed in a responsive grid that adapts to different screen sizes

## 📁 Project Structure

\`\`\`
dog-api-viewer/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx          # Main application component
├── components/
│   └── ui/               # shadcn/ui components
├── lib/
│   └── utils.ts
├── public/
├── README.md
└── package.json
\`\`\`

## 🎨 Features Breakdown

### Data Fetching
- Fetches data from multiple API endpoints
- Handles loading states and error cases
- Implements proper TypeScript interfaces for API responses

### User Interface
- Clean, modern design with gradient backgrounds
- Responsive grid layout for dog images
- Interactive controls with proper hover states
- Loading spinners and visual feedback

### Search & Filter
- Real-time search filtering
- Breed-specific filtering
- Visual indicators for active filters
- Clear search functionality

## 🚀 Deployment Options

### Vercel (Recommended)
1. Click the "Deploy" button in the app preview
2. Connect your GitHub repository
3. Deploy automatically

### Other Platforms
- **Netlify**: Connect your Git repository
- **GitHub Pages**: Use \`npm run build\` and deploy the \`out\` folder
- **Railway**: Connect repository and deploy

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Dog CEO API](https://dog.ceo/dog-api/) for providing free dog images
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Lucide React](https://lucide.dev/) for icons
