import flowbitePlugin from 'flowbite/plugin';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      backgroundImage: {
        appointement_bg: "url('/images/Appointment_bg.jpg')",
        slider_bg:
          'https://img.freepik.com/premium-photo/doctor-team-with-medical-clinic-background_488220-52976.jpg',
      },
    },
  },
  plugins: [flowbitePlugin],
};
