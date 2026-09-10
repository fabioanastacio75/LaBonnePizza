import heroPizza from '@assets/restaurant-photos/la-bonne-pizza-nit-feature.webp';
import owners from '@assets/restaurant-photos/la-bonne-pizza-owners.jpeg';
import pizzaMaking from '@assets/_DSF1254_1789065353084.jpg';
import drinksCheers from '@assets/DSCF1100_1789065353084.jpg';
import margherita from '@assets/Marga1_1789065353084.jpeg';
import finishedPizza from '@assets/unnamed_1789065353085.webp';
import pizzaSlice from '@assets/restaurant-photos/IMG_8813.jpg';
import foldedPizza from '@assets/restaurant-photos/IMG_8827.jpg';
import twoPizzas from '@assets/restaurant-photos/IMG_9075.jpg';

/*
 * PHOTO SWAP GUIDE
 * Replace one of the imports above with a restaurant-supplied image, then assign it
 * to the matching slot below. Keeping the slots here means every website image
 * can be changed from one file without hunting through components.
 *
 * Current verified sources:
 * - heroPizza / owners: NiT's August 2026 feature about La Bonne Pizza.
 * - all other images: supplied directly by the restaurant.
 */
export const sitePhotos = {
  hero: heroPizza,
  menu: pizzaMaking,
  drinks: drinksCheers,
  story: owners,
  social: [margherita, finishedPizza, pizzaSlice, foldedPizza, twoPizzas],
};
