
import { Product } from '../types';

/**
 * CONFIGURACIÓN DE APIFY (REQUERIDO)
 * Obtén tu token en: https://console.apify.com/account#/api
 */
const APIFY_TOKEN = ''; // DEBES COLOCAR TU TOKEN DE APIFY AQUÍ
const FB_PAGE_URL = 'https://www.facebook.com/share/182dqtyq1v/'; // URL de JP Fashion

export const fetchFacebookProducts = async (): Promise<Product[]> => {
  if (!APIFY_TOKEN) {
    console.error("APIFY_TOKEN no configurado en facebookService.ts");
    return [];
  }

  try {
    // Llamada al actor apify/facebook-posts-scraper de forma síncrona
    // Este endpoint ejecuta el scraper y devuelve los items directamente
    const response = await fetch(
      `https://api.apify.com/v2/acts/apify~facebook-posts-scraper/run-sync-get-dataset-items?token=${APIFY_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "startUrls": [{ "url": FB_PAGE_URL }],
          "resultsLimit": 8,
          "viewOption": "ADS_AND_POSTS",
          "includeDraftPosts": false,
          "onlyPostsNewerThan": "2024-01-01"
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Error en el scraper de Apify");
    }

    const rawData = await response.json();

    // Mapeo técnico de los datos extraídos por el scraper
    return rawData.map((item: any, index: number) => {
      // 1. Extraer precio con Regex del texto real del post
      const priceMatch = item.text?.match(/\$\s?(\d+(?:\.\d{1,2})?)/);
      const price = priceMatch ? parseFloat(priceMatch[1]) : 'consultar';

      // 2. Extraer imagen (Apify suele devolver un array de imágenes)
      const imageUrl = item.images && item.images.length > 0 
        ? item.images[0] 
        : 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800';

      // 3. Crear nombre basado en las primeras palabras del texto
      const firstLine = item.text?.split('\n')[0] || "Nueva Publicación";
      const name = firstLine.length > 30 ? firstLine.substring(0, 30) + '...' : firstLine;

      return {
        id: item.id || `apify_${index}`,
        name: name,
        price: price,
        category: "Exclusivo Redes",
        image: imageUrl,
        description: item.text || "Sin descripción disponible.",
        isSocial: true,
        link: item.url || FB_PAGE_URL
      };
    });

  } catch (error) {
    console.error("Error crítico en la extracción con Apify:", error);
    return [];
  }
};
