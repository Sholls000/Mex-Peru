import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          description: {
            country: "Country",
            selectCountry: "Select a Country",
            email: "Email",
            password: "Password",
            signin: "Sign In",
            resetPassword: "Reset Password",
            passwordReset: "Password Reset",
            changeCoordinate: "Change Coordinate",
            updateCoordinate: "Update Coordinate",
            longitude: "longitude",
            latitude: "latitude",
            longitudeToolTip1: "The correct Longitude format should be",
            longitudeToolTip2: "a maximum of three whole numbers digits",
            longitudeToolTip3: "(between -180 and 180) and not more than six (6)",
            longitudeToolTip4: "decimal places, i.e -179.999999, 179.999999",
            latitudeToolTip1: "The correct Latitude format should be",
            latitudeToolTip2: "a maximum of two whole numbers digits",
            latitudeToolTip3: "(between -90 and 90) and not more than six (6)",
            latitudeToolTip4: " decimal places, i.e -89.999999, 89.999999",
            loginSuccess: "Login Successful",
            invalidLogin: "Invalid Email or Password",
            invalidCountry: "Please Select a Country",
            dashboard: "Dashboard",
            administrator: "Administrator",
            options: "Would you like to..",
            searchPocId: "Press Enter key to Search",
            invalidPocId: "Invalid Poc Id",
            coordinateSaved: "Coordinates have been updated successfully",
            invalidLongitude: "Invalid longitude provided",
            invalidLatitude: "Invalid latitude provided",
            invalidEmailOrPocId: "Please enter a valid email address or POC ID!",
            validCredentials: "Credentials have been updated successfully",
          },
          // here we will place our translations...
        },
      },
      es: {
        translation: {
          description: {
            country: "País",
            selectCountry: "Seleccione un País",
            email: "Correo Electronico",
            password: "Contraseña",
            signin: "Inicia Sesión",
            resetPassword: "Restablecer Contraseña",
            passwordReset: "Restablecimiento de contraseña",
            changeCoordinate: "Cambiar coordenadas",
            updateCoordinate: "Actualizar Coordenadas",
            longitude: "longitud",
            latitude: "latitud",
            latitudeToolTip1: "El formato correcto de Latitude debe ser",
            latitudeToolTip2: "un máximo de dos dígitos de números enteros",
            latitudeToolTip3: "(entre -90 y 90) y no más de seis (6)",
            latitudeToolTip4: "decimales, es decir, -89.999999, 89.999999.",
            longitudeToolTip1: "El formato de longitud correcto debe ser",
            longitudeToolTip2: "un máximo de tres números enteros dígitos",
            longitudeToolTip3: "(entre -180 y 180) y no más de seis (6)",
            longitudeToolTip4: "decimales, es decir, -179.999999, 179.999999",
            loginSuccess: "Inicio de sesión exitoso",
            invalidLogin: "Correo Electrónico o Contraseña no Válidos",
            invalidCountry: "Por Favor, Seleccione un país",
            dashboard: "Tablero",
            administrator: "Administrador",
            options: "¿Te gustaría..",
            searchPocId: "Presione la tecla ENTRAR para buscar",
            invalidPocId: "ID de POC no válido",
            coordinateSaved: "Las coordenadas se han actualizado correctamente",
            invalidLongitude: "Longitud no válida proporcionada",
            invalidLatitude: "Latitud no válida proporcionada",
            invalidEmailOrPocId:
              "¡Ingrese una dirección de correo electrónico válida o una identificación de POC!",
            validCredentials: "Las credenciales se han actualizado correctamente",
          },
        },
      },
    },
  });

export default i18n;
