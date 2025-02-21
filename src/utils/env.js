import dotenv from 'dotenv';

dotenv.config();

// Onu şu şekilde kullanabiliriz: env('PORT', '3000');
// Eğer bu isimde bir ortam değişkeni belirtilmemişse ve varsayılan bir değer de verilmemişse,
// bu fonksiyonun çağrılması Missing: process.env['PORT'] mesajıyla bir hata fırlatır.

//

export const ENV_VARS = {
  GOOGLE_AUTH_CLIENT_ID: 'your-google-client-id',
  GOOGLE_AUTH_CLIENT_SECRET: 'your-google-client-secret',
};

export const env = (key) => {
  return process.env[key] || ENV_VARS[key];
};
