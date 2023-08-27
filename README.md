# TechSurf2023
# Image Editor Application
Welcome to the Image Editor application! This application allows you to upload,tag, edit, and manage images with various features. The app is built using React.js, Node.js, Express.js, Chart.js, Tailwind CSS, Azure Computer Vision, and MongoDB.

## Features
1. Upload images
2. View a dashboard with uploaded images
3. Edit images with various tools
4. Tag images using Azure Computer Vision
5. Delete, download, or edit images
6. Display a pie chart showing image upload count on different days
## Prerequisites
1. Node.js (v14 or higher)
2. MongoDB instance
3. Azure subscription with Computer Vision API key and endpoint
4. Reactjs
## Installation
### Clone the Repository
```shell
git clone https://github.com/nishtha1239/TechSurf2023.git
```
### Install Client Depenedencies
```shell
yarn create vite
```
### Installing node modules
```shell
yarn
```
### Launch the Client
```shell
yarn dev
```
### Install Server dependencies
```shell
cd ../api
```
```shell
touch index.js
```
```shell
yarn add express mongoose
```
### .env 
make this file under server folder 
```
API_KEY="your_api_key"
MONGO_URL="your_mongoDb_url"
END_POINT="your_endpoint"
```
## Usage
### Home Page
The home page displays a pie chart showing the count of images uploaded on different days.
### Dashboard
1. The dashboard lists all uploaded images in form of cards.
2. You can delete, download, or edit each image using the provided options.
3. Use the "Upload" button to add new images.
4. Tags are automatically added using Azure Computer Vision.
### Image Editor
The edit option allows you to:
1. Crop
2. rotate
3. resize
4. Change the format of images.
5. Overlay Text
6. Adjust Brightness
7. Zoom
## Technologies Used
1. React.js
2. Node.js
3. Express.js
4. Chart.js
5. Tailwind CSS
6. Azure Computer Vision
7. MongoDB
## Contributing
Contributions are welcome! If you encounter any issues or have suggestions for improvements, please submit an issue or pull request.
