module.exports = {
  extends: ["next/core-web-vitals", "next/typescript"],
  rules: {
    // Allow ts-ignore with descriptions
    "@typescript-eslint/ban-ts-comment": [
      "warn",
      {
        "ts-ignore": "allow-with-description",
        "ts-nocheck": "allow-with-description",
        "ts-check": false,
        "ts-expect-error": "allow-with-description",
      },
    ],
    // Allow unused variables during development
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    // Allow any type during development
    "@typescript-eslint/no-explicit-any": "warn",
    // Next.js specific
    "@next/next/no-html-link-for-pages": "error",
    "@next/next/no-img-element": "warn",
  },
};
