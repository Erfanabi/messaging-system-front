# Hotel Messaging System

This project is a messaging system for hotels developed using Next.js and modern React libraries. It provides a user-friendly form interface for submitting various hotel service requests.

## Key Features

- Hotel information and contact details registration form
- Selection and description of required items (pillows, mattresses, sheets, etc.)
- Support for Gulf region country phone numbers
- Form validation using Formik and Yup
- Modern and responsive UI using HeroUI and Tailwind CSS
- WhatsApp integration for message delivery

## Technologies Used

- **Next.js**: React framework for web application development
- **Formik**: Form management
- **Yup**: Form validation
- **HeroUI**: Modern UI components
- **Tailwind CSS**: CSS framework for UI design
- **React Phone Input 2**: Phone number input component
- **React Hot Toast**: Notification messages display

## Prerequisites

- Node.js version 18 or higher
- npm or yarn

## Installation and Setup

1. Clone the project:
```bash
git clone [repository-url]
cd messaging-system-front
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The project will be available at `http://localhost:3000`

## Project Structure

```
├── src/
│   ├── app/                 # Main application components
│   │   ├── layout.js        # Main application layout
│   │   └── page.js          # Main page with request form
│   └── components/          # Reusable components
│       ├── CheckboxInput.js # Checkbox component with description input
│       └── FormInput.js     # Form input component
├── public/                  # Static files
└── tailwind.config.js      # Tailwind CSS configuration
```

## How to Use

1. Fill out the form with hotel information and contact details
2. Select required items and enter necessary descriptions
3. Click the submit button to send the information via API to WhatsApp

## Environment Setup

To connect to the WhatsApp API, you need to set up environment variables. Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Development

1. To add new form fields:
   - Add field in `initialValues` in `page.js`
   - Add validation rules in `validationSchema`
   - Add corresponding form component

2. To modify appearance and styling:
   - Configure colors and theme in `tailwind.config.js`
   - Custom styles in `globals.css`

## Contributing

We welcome your contributions to improve this project. Please create a Pull Request for any suggested changes.
