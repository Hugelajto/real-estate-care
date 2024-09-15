export const fetchInspections = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/Hugelajto/realestatecare-data/main/db.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching inspections:', error);
    throw error;
  }
};