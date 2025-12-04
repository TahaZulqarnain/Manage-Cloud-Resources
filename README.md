# Cloud Resource Manager

A modern Angular application for managing cloud resources including Virtual Networks (VNets), Subnets, and Network Interface Cards (NICs) with a visual network diagram representation.

## 🌟 Features

- **Resource Management**: Create and manage VNets, Subnets, and NICs
- **Visual Network Diagram**: Interactive visualization of your cloud resource hierarchy
- **Tag Management**: Add custom tags to resources for better organization
- **Form Validation**: Real-time validation for all resource inputs
- **JSON Export**: Export your configuration as JSON file
- **Responsive Design**: Works seamlessly on desktop and tablet devices
- **Modern UI**: Beautiful and intuitive user interface

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 18.x or higher)
- **npm** (comes with Node.js) or **yarn**
- **Angular CLI** (version 17.x) - Will be installed during setup
- **Git** (for cloning the repository)

## 🚀 Installation & Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/TahaZulqarnain/Manage-Cloud-Resources.git
cd manage-cloud-resources
```

### Step 2: Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### Step 3: Install Angular CLI (if not already installed)

```bash
npm install -g @angular/cli@17
```

Or using yarn:
```bash
yarn global add @angular/cli@17
```

### Step 4: Verify Installation

Check if Angular CLI is installed correctly:
```bash
ng version
```

You should see Angular CLI version 17.x.x

## 🏃 Running the Application

### Development Server

Start the development server:
```bash
npm start
```

Or:
```bash
ng serve -o
```

The application will be available at `http://localhost:4200/`

The app will automatically reload if you change any of the source files.

### Build for Production

To build the project for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📁 Project Structure

```
manage-cloud-resources/
├── src/
│   ├── app/
│   │   ├── modules/
│   │   │   └── main/
│   │   │       └── cloud-manager/
│   │   │           ├── cloud-manager.component.*
│   │   │           ├── vnet/
│   │   │           ├── subnet/
│   │   │           └── nic/
│   │   ├── shared/
│   │   │   ├── components/
│   │   │   │   └── tag-input/
│   │   │   └── styles/
│   │   │       └── _variables.scss
│   │   └── core/
│   │       └── interfaces/
│   ├── assets/
│   └── styles.scss
├── package.json
└── README.md
```

## 🛠️ Technologies Used

- **Angular 17** - Frontend framework
- **TypeScript** - Programming language
- **SCSS** - Styling with variables
- **vis-network** - Network visualization library
- **RxJS** - Reactive programming
- **Angular Reactive Forms** - Form management

## 📝 Usage Guide

### Creating Resources

1. **Add a VNet**: Click the "Add VNet" button
2. **Add Subnets**: Inside a VNet, click "Add Subnet"
3. **Add NICs**: Inside a Subnet, click "Add NIC"
4. **Add Tags**: Use the tag input component to add key-value pairs to any resource

### Exporting Configuration

Click the "Export JSON" button to download your current configuration as a JSON file.

### Form Validation

- All resource names are required
- The form validates in real-time
- Invalid fields are highlighted in red

## 🎨 Styling

The project uses SCSS variables for consistent theming. All colors, spacing, and other design tokens are defined in:
```
src/app/shared/styles/_variables.scss
```

You can customize the entire application's appearance by modifying the variables in this file.

## 📦 Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build for production

## 📄 License

This project is private and proprietary.

## 👤 Author

Taha Zulqarnain

## 🙏 Acknowledgments

- Angular team for the amazing framework
- vis-network for the visualization library
