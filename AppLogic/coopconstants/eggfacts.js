import {
    ageF,
    colorF,
    fertileF,
    freshF,
    fridgeF,
    healtyF,
    testF,
    yolkF
} from "./images";

const eggFacts = [
    {
        emoji: '🥚',
        title: 'Is Your Egg Still Fresh?',
        content: [
            'The easiest trick? Just drop it in water!',
            'Sinks & lays flat? Fresh!',
            'Stands upright? Still OK, but eat soon.',
            'Floats? Toss it out — it’s gone bad.',
            'This happens because older eggs develop air pockets inside — they literally start floating away!'
        ],
        image: freshF
    },
    {
        emoji: '🐣',
        title: 'Is My Egg Fertilized?',
        content: [
            'Unless you’ve got a rooster in your flock, your eggs are not fertilized.',
            'Even if they are, fertilized eggs are perfectly safe to eat.',
            'Look for a small white “bullseye” dot on the yolk — that’s the sign it was fertilized.',
            'No rooster, no worries!'
        ],
        image: fertileF
    },
    {
        emoji: '🎨',
        title: 'Why Are Some Eggs Brown and Others White?',
        content: [
            'It’s all about the breed of the chicken!',
            'White-feathered hens usually lay white eggs.',
            'Red or brown-feathered hens lay brown ones.',
            'Fun fact: There’s no nutritional difference — just different shells on the same delicious inside!'
        ],
        image: colorF
    },
    {
        emoji: '🌈',
        title: 'Yolk Colors: What Do They Mean?',
        content: [
            'Bright orange? Pale yellow? The yolk’s color depends on the hen’s diet!',
            'Rich yellow-orange: lots of greens, bugs, and sunshine.',
            'Pale: mostly grains.',
            'It doesn’t change nutrition much, but it sure makes your omelet pop.'
        ],
        image: yolkF
    },
    {
        emoji: '💪',
        title: 'Are Eggs Really That Healthy?',
        content: [
            'Absolutely! Eggs are packed with:',
            '• Protein to fuel your body',
            '• Choline for your brain',
            '• Vitamin D for strong bones',
            'And guess what? One large egg has only ~70 calories.',
            'Talk about a compact superfood!'
        ],
        image: healtyF
    },
    {
        emoji: '❄️',
        title: 'Should I Refrigerate Eggs?',
        content: [
            'In the U.S. — yes. In Europe — not always.',
            'Unwashed eggs with their natural coating (called the bloom) can stay on the counter for weeks.',
            'Washed eggs need to be chilled.',
            'So: Fridge for store-bought. Counter for fresh-from-the-coop.'
        ],
        image: fridgeF
    },
    {
        emoji: '🐔',
        title: 'Do Older Hens Lay Bigger Eggs?',
        content: [
            'Yep! Young hens start with small or medium eggs.',
            'As they grow older, their eggs get bigger — but they may lay less often.',
            'So if you find a jumbo egg in your basket… thank a senior hen!'
        ],
        image: ageF
    },
    {
        emoji: '🧪',
        title: 'How Can I Tell if an Egg Is Bad Without Cracking It?',
        content: [
            'Besides the water test, try the shake test:',
            'Hold the egg near your ear and shake gently.',
            'If it sloshes or sounds watery — probably bad.',
            'Still unsure? Crack it into a separate bowl. Your nose will tell you right away!'
        ],
        image: testF
    }
];

export default eggFacts;