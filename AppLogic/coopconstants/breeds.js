import {
    blackChick,
    blueChick,
    brownChick,
    lightYellowChick,
    yellowChick,
    orangeChick,
    orangeGreenChick,
    redChick,
    whiteChick,
    zebraChick
} from "./images";

const breeds = [
    {
        name: 'Blue Andalusian',
        info: 'The Blue Andalusian is a Mediterranean breed originating from Spain, valued for its elegant blue-grey plumage and active disposition. This breed is considered dual-purpose but leans more toward egg production. Andalusians are hardy in warm climates and known for being good foragers. They are lightweight chickens with graceful bodies and long tails.',
        eggProduction: 'Approximately 160–180 white eggs per year',
        eggsPerYear: '160–180',
        meatYield: {
            full: 'Roosters average 2.5–3.0 kg, hens about 2.0–2.5 kg',
            rooster: '2.5–3.0 kg',
            hen: '2.0–2.5 kg'
        },
        feedCare: 'Thrives on a balanced layer feed with occasional calcium supplements; allow free-ranging for best health.',
        chicken: blueChick
    },
    {
        name: 'Buff Orpington',
        info: 'The Buff Orpington is a British breed recognized for its calm temperament and fluffy golden-buff feathers. It is a popular choice for backyard flocks due to its docile nature and good productivity. Buff Orpingtons are excellent layers and produce a decent quantity of meat, making them a true dual-purpose breed.',
        eggProduction: 'Around 250–280 light brown eggs per year',
        eggsPerYear: '250-280',
        meatYield: {
            full: 'Roosters 4.0–5.0 kg, hens 3.0–4.0 kg',
            rooster: '4.0–5.0 kg',
            hen: '3.0–4.0 kg'
        },
        feedCare: 'Moderate eaters; do well on standard layer feed and enjoy occasional kitchen scraps and greens.',
        chicken: lightYellowChick
    },
    {
        name: 'Australorp',
        info: 'The Australorp is an Australian breed developed from Black Orpingtons and bred for exceptional egg-laying ability. Known for its glossy black plumage and calm demeanor, this breed holds world records in egg production. It also offers solid meat value and is easy to manage in various environments.',
        eggProduction: 'Up to 300–300+ light brown eggs per year',
        eggsPerYear: '300–300+',
        meatYield: {
            full: 'Roosters 3.5–4.0 kg, hens 2.5–3.0 kg',
            rooster: '3.5–4.0 kg',
            hen: '2.5–3.0 kg'
        },
        feedCare: 'High-protein feed during peak laying; supplement with calcium and allow access to pasture if possible.',
        chicken: blackChick
    },
    {
        name: 'Rhode Island Red',
        info: 'Developed in the United States, the Rhode Island Red is one of the most reliable and hardy dual-purpose breeds. It features rich reddish-brown plumage and is known for consistent egg production and good meat yield. Suitable for various climates, it`s a farm favorite worldwide.',
        eggProduction: '250–300 brown eggs per year',
        eggsPerYear: '250–300',
        meatYield: {
            full: 'Roosters 3.0–4.0 kg, hens 2.5–3.0 kg',
            rooster: '3.0–4.0 kg',
            hen: '2.5–3.0 kg'
        },
        feedCare: 'Hardy and adaptable to various diets. Layer feed plus kitchen scraps and grains work well. Supplement calcium and grit for strong shells. Avoid overfeeding to prevent obesity.',
        chicken: redChick
    },
    {
        name: 'Ancona',
        info: 'The Ancona is a small to medium-sized breed originating from Italy, characterized by mottled black-and-white plumage. It is a prolific layer of white eggs and is more valued for egg production than meat. Anconas are active, flighty, and do well in free-range environments.',
        eggProduction: '220–230 white eggs per year',
        eggsPerYear: '220–230',
        meatYield: {
            full: 'Roosters 2.0–2.5 kg, hens 1.5–2.0 kg',
            rooster: '2.0–2.5 kg',
            hen: '1.5–2.0 kg'
        },
        feedCare: 'Active birds needing more energy—offer layer pellets with occasional cracked corn. Loves free-ranging and insect-hunting. Grit and oyster shell access is essential.',
        chicken: zebraChick
    },
    {
        name: 'White Leghorn',
        info: 'White Leghorns are among the most productive egg-laying breeds in the world. Originally from Italy, they are lightweight, energetic birds with pure white plumage and large upright combs. Though not ideal for meat production, their efficiency in laying white eggs makes them a commercial standard.',
        eggProduction: '280–320 white eggs per year',
        eggsPerYear: '280–320',
        meatYield: {
            full: 'Roosters 2.0–2.5 kg, hens 1.5–2.0 kg',
            rooster: '2.0–2.5 kg',
            hen: '1.5–2.0 kg'
        },
        feedCare: 'High metabolism requires protein-rich (18%) layer feed. These birds consume less feed but need nutrient-dense meals. Free-range improves egg quality. Always provide calcium.',
        chicken: whiteChick
    },
    {
        name: 'New Hampshire Red',
        info: 'The New Hampshire Red is a fast-growing American breed developed from Rhode Island Reds. It matures quickly, has a solid body, and features deep reddish-brown plumage. Known for its dual-purpose qualities, it is a reliable source of both eggs and meat.',
        eggProduction: '200–240 brown eggs per year',
        eggsPerYear: '200–240',
        meatYield: {
            full: 'Roosters 3.0–3.5 kg, hens 2.5–3.0 kg',
            rooster: '3.5–4.0 kg',
            hen: '2.5–3.0 kg'
        },
        feedCare: 'Fast growers needing quality protein-rich feed. Offer grains, legumes, and greens. Support laying with calcium and grit. Adjust feed as they mature to avoid obesity.',
        chicken: brownChick
    },
    {
        name: 'Faverolles',
        info: 'The Faverolles is a French breed known for its friendly disposition, fluffy beard and muffs, and feathered legs. It comes in several color varieties, but the Salmon Faverolles is most popular. It’s considered dual-purpose with good cold-hardiness and ornamental appeal.',
        eggProduction: '180–200 light brown/pinkish eggs per year',
        eggsPerYear: '180–200',
        meatYield: {
            full: 'Roosters 3.5–4.0 kg, hens 2.5–3.0 kg',
            rooster: '3.5–4.0 kg',
            hen: '2.5–3.0 kg'
        },
        feedCare: 'Good cold-weather eaters. Provide 16% layer mash or pellets with scratch grains in winter. They enjoy fermented feed and greens. Needs grit and calcium supplements.',
        chicken: orangeChick
    },
    {
        name: 'Golden Comet',
        info: 'The Golden Comet is a hybrid breed designed for high egg production and ease of care. It`s a sex-link bird, which means males and females can be distinguished at hatch. It matures early and lays consistently throughout the year.',
        eggProduction: '280–320 brown eggs per year',
        eggsPerYear: '280–320',
        meatYield: {
            full: 'Roosters 2.5–3.0 kg, hens 2.0–2.5 kg',
            rooster: '2.5–3.0 kg',
            hen: '2.0–2.5 kg'
        },
        feedCare: 'High-performance layers—feed 18% protein during peak laying. Include greens, cracked corn, and occasional treats. Provide constant access to oyster shells and grit.',
        chicken: yellowChick
    },
    {
        name: 'Isa Brown',
        info: 'The Isa Brown is a commercial hybrid layer known for its exceptional egg output and friendly nature. These hens are ideal for backyard keepers and small-scale farms. While not bred for meat, they still provide moderate carcass weight.',
        eggProduction: '300–330 brown eggs per year',
        eggsPerYear: '300–330',
        meatYield: {
            full: 'Roosters 2.5–3.0 kg, hens 2.0–2.5 kg',
            rooster: '2.5–3.0 kg',
            hen: '2.0–2.5 kg'
        },
        feedCare: 'Heavy layers need consistent access to 18% layer feed. Supplement with greens and high-calcium treats. Avoid overfeeding scratch grains. Monitor weight and shell quality.',
        chicken: orangeGreenChick
    }
];

export default breeds;