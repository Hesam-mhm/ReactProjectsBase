interface BaseUrls {
  main: string;
}

const getBaseUrls = (): BaseUrls => {
  return {
    main: import.meta.env.VITE_MAIN_API_URL || 'https://staging.frappe.io',
  };
};

export default getBaseUrls();
