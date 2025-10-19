// Global configuration

export const MAPBOX_TOKEN = process.env.VITE_MAPBOX_TOKEN || '';
export const MAPBOX_API = MAPBOX_TOKEN; // Legacy export for backward compatibility

export const config = {
  mapbox: {
    token: MAPBOX_TOKEN,
  },
};
