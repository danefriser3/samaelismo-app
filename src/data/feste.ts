type Intervallo = {
    start: string;
    end: string;
} | null;

interface FestivitaInfo {
    tipo: string;
    data: string[];
    intervallo: Intervallo;
    descrizione: string;
    backgroundColor: string | null;
    archetipo: string | null;
    elemento: string | null;
    rituale: string | null;
}


export const feste = {
    "Keroforie": {
        "tipo": "Festività minore",
        "data": ["02-03"],
        "intervallo": null,
        "descrizione": "Keroforie, celebrated annually on February 3rd, is a minor yet deeply meaningful feast dedicated to the crafting and consecration of wax candles destined for the entire liturgical year. This solemn occasion highlights the sacred art of preparing these candles, which are imbued with spiritual significance as they symbolize divine light and guidance throughout the year’s celebrations. The process involves communal prayers, blessings, and rituals to sanctify the wax, reinforcing the connection between the material and the spiritual. It is a moment of shared devotion, where Samaelite faithful come together to engage in this meticulous work, fostering unity and reverence. Though considered a minor festivity, Keroforie’s role is essential for maintaining the sanctity of ritual objects and the continuity of Samaelite worship.",
        "backgroundColor": null,
        "textColor": null,
        "archetipo": null,
        "elemento": null,
        "rituale": null
    },
    "Ofisie": {
        "tipo": "Festività maggiore",
        "data": ["12-20", "12-21", "12-22"],
        "intervallo": { "start": "12-20", "end": "03-19" },
        "descrizione": "The Ofisie, spanning from December 20th to 22nd, is the paramount Samaelite feast corresponding with the winter solstice. This period marks the shortest daylight and longest night of the year, during which the Serpent itself is honored as Omnipotens Pater Creationis — the All-Powerful Father of Creation. The ritual observances envelop the community in the color red, manifesting in vestments, candles, and decorations symbolizing fire, vitality, and the enduring spark of life amidst darkness. Sacred spaces are adorned with evergreen branches, cedar, pine cones, and other winter essences, evoking both protection and renewal. Central to the feast is the lighting of a red candle by each participant in their main window or in the communal brazier within the Acronide temple, kept aflame by the Hiereús and volunteers for three days. This living flame embodies faith, hope, and the collective spiritual strength during the darkest time of year. The Ierà involves burning parchment wishes in this flame, linking participants to the Farmacon — the mystical essence of transformation—and to the Serpent's creative power. Traditional serpent-shaped cinnamon biscuits are prepared and shared, symbolizing unity, care, and mankind’s sacred bond with the Serpent’s generative force. Communal feasts and celebrations deepen fellowship, reinforcing the spiritual and social fabric of the Samaelite community during this pivotal season.",
        "backgroundColor": "red !important",
        "textColor": "black !important",
        "archetipo": "Serpent – Omnipotens Pater Creationis",
        "elemento": "Fire",
        "rituale": null
    },
    "Disoterie": {
        "tipo": "Festività maggiore",
        "data": ["03-20", "03-21", "03-22"],
        "intervallo": { "start": "03-20", "end": "06-19" },
        "descrizione": "The Disoterie, celebrated at the spring equinox from March 20th to 22nd, marks the rebirth of nature and the renewal of life, symbolizing humanity’s inner awakening towards the Farmacon through the archetypes of Philia and Eros. After the harsh winter and the dominance of Thanatos, this festivity embodies hope, love, and revitalization. During Disoterie, gifts called doron are exchanged among participants, arranged around a central floral vessel wrapped in green cloth, which channels the vibrant energies of Eros. Unclaimed gifts are generously donated to charity, reflecting the feast’s spirit of generosity and communal care. A distinctive feature is the Agàpe Adelfoú initiative, a communal charity led by each Hiereús that reinforces the values of Eros and Agàpe as the social foundation of Samaelite life. Through song, dance, and shared rituals, the community embraces renewal and fosters bonds of affection and mutual support.",
        "backgroundColor": "green !important",
        "textColor": "white !important",
        "archetipo": "Philia / Eros",
        "elemento": "Water",
        "rituale": null
    },
    "Faidrerie": {
        "tipo": "Festività maggiore",
        "data": ["06-20", "06-21", "06-22"],
        "intervallo": { "start": "06-20", "end": "09-19" },
        "descrizione": "The Faidrerie feast, coinciding with the summer solstice from June 20th to 22nd, venerates the manifestation of Polemos, also known as Phosphoros, the Lord of Dawn and Vesper. This archetype symbolizes knowledge, wisdom, and the illuminating power of light in darkness. The celebration is a time for intellectual and spiritual enrichment, featuring philosophical debates, theological seminars, plenary readings, and editorial projects that explore Samaelite teachings. A unique aspect of Faidrerie is the procession carrying the icon of Polemos adorned with a Greek helmet, placed on the altar and surrounded by 121 blue and white candles. Attendees light these candles in rotation, symbolizing collective enlightenment and spiritual vigilance. During the Ierà, a veiled woman ceremonially crowns the Polemos icon with a bay laurel wreath, then removes her veil to reveal the hidden truth, representing the unveiling of Maya — the illusion — to reveal reality. This solemn ritual encapsulates the quest for wisdom and the breaking of illusions that obscure the true nature of existence.",
        "backgroundColor": "darkblue !important",
        "textColor": "white !important",
        "archetipo": "Phosphoros / Polemos",
        "elemento": "Air",
        "rituale": null
    },
    "Tanasimee": {
        "tipo": "Festività maggiore",
        "data": ["09-20", "09-21", "09-22"],
        "intervallo": { "start": "09-20", "end": "12-19" },
        "descrizione": "The Tanasimee, celebrated at the autumn equinox from September 20th to 22nd, marks the beginning of the autumnal cycle and is dedicated to Thanatos/Neikos, the Lord of disintegration and Death. Acronides are decorated with dry branches, pine cones, aromatic essences, dried flowers, and pomegranates—symbols recalling the myth of Proserpina’s abduction and the cyclical nature of life and death. While associated with darker themes, the Tanasimee is a vital initiatory feast preparing the community for the renewal symbolized by the upcoming Disoterie. Central to this celebration is the labyrinth ritual, kéleithos katharmós, where participants are blindfolded and guided barefoot along an earthen path. They experience ritual cleansing through breezes from raven-feather fans, a flame ceremony using a brazier, and immersion of the head in water, symbolizing purification and the shedding of past attachments. The rite represents the necessary destruction of outdated habits and the cyclical renewal essential to spiritual growth. Butterfly-shaped parchments play a symbolic role, on which confreres inscribe habits or traits they wish to abandon. These parchments are placed on an overturned torch board and subsequently buried in a coffin by the celebrant, signifying renunciation of the past and readiness for transformation.",
        "backgroundColor": "black !important",
        "textColor": "white !important",
        "archetipo": "Thanatos / Neikos",
        "elemento": "Terra",
        "rituale": null
    },
    "Aftonerie": {
        "tipo": "Festività minore",
        "data": ["08-15"],
        "intervallo": null,
        "descrizione": "Aftonerie, observed on August 15th, is a minor feast celebrating the glorification of the Samaelite Order and its community as a spiritual brotherhood dedicated to the Master. It provides a sacred pause for reflection on individual and collective contributions over the preceding year. During this day, members cultivate gratitude for the communal bonds and renew their personal commitment to the Order’s values and mission. Though less elaborate than major festivals, Aftonerie reinforces unity, devotion, and shared purpose among the Samaelite faithful.",
        "backgroundColor": "darkgoldenrod !important",
        "textColor": "black !important",
        "archetipo": null,
        "elemento": null,
        "rituale": null
    },
    "Udenerie": {
        "tipo": "Festività maggiore",
        "data": ["11-11"],
        "intervallo": null,
        "descrizione": "Udenerie, held on November 11th, marks both the beginning and the end of the Samaelite liturgical year and celebrates the Farmacon, representing Zeroth — the creative principle and origin of all existence. This solemn day is observed through a twelve-hour period of absolute ritual silence, from 11 AM to 11 PM. The silence symbolizes the primordial state of Nihil — the void before creation — and serves as a powerful meditative practice embodying emptiness and potentiality within the Ierà. Despite its profound significance, Udenerie does not include formal liturgies; instead, the silence itself functions as the central ritual, fostering introspection, spiritual cleansing, and connection to the primal creative force.",
        "backgroundColor": "white !important",
        "textColor": "black !important",
        "archetipo": null,
        "elemento": null,
        "rituale": "Silenzio rituale dalle 11:00 alle 23:00"
    },
    "Magistral Jubilee": {
        "tipo": "Festività solenne",
        "data": [],
        "intervallo": null,
        "descrizione": "The Magistral Jubilee is a solemn feast celebrated at key milestones—after 1, 5, 10 years, and every subsequent decade—honoring the installation and reign of each Ipsissimus Magister Templi. This event, organized by the Magisterium or a dedicated committee, recognizes the spiritual leadership, guidance, and enduring influence of the Magister within the Samaelite community. The Jubilee underscores the continuity of tradition, the transmission of wisdom, and the collective cohesion fostered under the Magister’s tenure, offering a moment for communal gratitude and reaffirmation of commitment to the path.",
        "backgroundColor": null,
        "textColor": null,
        "archetipo": null,
        "elemento": null,
        "rituale": null
    }
}
  
  


interface FestivitaInfo {
    tipo: string;
    data: string[]; // array di date "MM-DD"
    intervallo: Intervallo;
    descrizione: string;
    backgroundColor: string | null;
    textColor: string | null; // colore del testo, se necessario
    archetipo: string | null;
    elemento: string | null;
    rituale: string | null;
}

type Festivita = Record<string, FestivitaInfo>;

interface FestivitaOggi extends FestivitaInfo {
    nome: string;
}
interface FestivitaConRange {
    nome: string;
    info: FestivitaInfo;
    startNum: number; // numero mmdd per ordinare
    endNum: number;
}

// Funzione di utilità per convertire "MM-DD" in numero (es. "03-20" -> 320)
export function mmddToNumber(mmdd: string): number {
    return parseInt(mmdd.replace("-", ""), 10);
}

// Controlla se date ricade in intervallo considerando anno ciclico
export function isDateInInterval(dateNum: number, startNum: number, endNum: number): boolean {
    if (startNum <= endNum) {
        return dateNum >= startNum && dateNum <= endNum;
    } else {
        return dateNum >= startNum || dateNum <= endNum;
    }
}

// Funzione principale tipizzata
export const getFestivitaOggi = (festivitaObj: Festivita): FestivitaOggi | null => {
    const now = new Date();
    const today = mmddToNumber(now.toISOString().slice(5, 10)); // "MM-DD"

    for (const [nome, info] of Object.entries(festivitaObj)) {
        if (info.data && info.data.length > 0) {
            if (info.data.some(d => mmddToNumber(d) === today)) {
                return { nome, ...info };
            }
        }
        if (info.intervallo) {
            const start = mmddToNumber(info.intervallo.start);
            const end = mmddToNumber(info.intervallo.end);
            if (isDateInInterval(today, start, end)) {
                return { nome, ...info };
            }
        }
    }
    return null;
}

function adjustDate(date: string) {
    const d = date.split("-");
    return d[1] + "/" + d[0]
}

export function getFestivitaOrdinata(festivitaObj: Festivita): FestivitaConRange[] {
    const list: FestivitaConRange[] = [];

    for (const [nome, info] of Object.entries(festivitaObj)) {
        if (info.intervallo) {
            list.push({
                nome,
                info: {
                    ...info,
                    intervallo: {
                        end: adjustDate(info.intervallo.end),
                        start: adjustDate(info.intervallo.start)
                    },
                },
                startNum: mmddToNumber(info.intervallo.start),
                endNum: mmddToNumber(info.intervallo.end),
            });
        } else if (info.data.length > 0) {
            // Se ci sono più date, prendi la prima per ordinare
            list.push({
                nome,
                info: {
                    ...info,
                    data: [adjustDate(info.data[0])]
                },
                startNum: mmddToNumber(info.data[0]),
                endNum: mmddToNumber(info.data[info.data.length - 1]),
            });
        }
    }

    // Ordina per startNum (mese-giorno)
    list.sort((a, b) => a.startNum - b.startNum);

    return list;
}
