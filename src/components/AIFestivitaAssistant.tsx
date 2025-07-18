import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import SmartToy from '@mui/icons-material/SmartToy';
import Send from '@mui/icons-material/Send';
import Close from '@mui/icons-material/Close';
import { feste } from '../data/liturgical-calendar';
import { liberSpirae } from '../data/sacred-texts';

interface AIFestivitaAssistantProps {
    onClose?: () => void;
}

interface Message {
    id: string;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

export default function AIFestivitaAssistant({ onClose }: AIFestivitaAssistantProps) {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hello! I am your AI assistant for Samaelite knowledge. You can ask me about:\n\n• **Festivities**: Ofisie, Disoterie, Keroforie and other celebrations\n• **Sacred Texts**: Liber Spirae chapters and verses\n• **Doctrine**: Samaelite beliefs and practices\n• **Rituals**: How ceremonies are performed\n\nHow can I help you?',
            isUser: false,
            timestamp: new Date()
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        onClose?.();
    };

    const suggestedQuestions = [
        "What is Ofisie?",
        "Tell me about Liber Spirae",
        "What are the major festivities?",
        "Explain the First Spira",
        "What is the Second Spira about?",
        "Tell me about the Third Spira",
        "Explain the Fourth Spira",
        "What is the Fifth Spira?",
        "Tell me about the Sixth Spira",
        "What is the Serpent?",
        "How do Samaelites worship?"
    ];

    const generateResponse = (question: string): string => {
        const lowerQuestion = question.toLowerCase();

        // Search for specific festivities information
        for (const [nome, festa] of Object.entries(feste)) {
            if (lowerQuestion.includes(nome.toLowerCase())) {
                return `**${nome}**\n\n${festa.descrizione}\n\n` +
                    `**Type:** ${festa.tipo}\n` +
                    `**Dates:** ${festa.data.join(', ')}\n` +
                    (festa.archetipo ? `**Archetype:** ${festa.archetipo}\n` : '') +
                    (festa.elemento ? `**Element:** ${festa.elemento}\n` : '') +
                    (festa.color ? `**Color:** ${festa.color}\n` : '');
            }
        }

        // Liber Spirae questions
        if (lowerQuestion.includes('liber spirae') || lowerQuestion.includes('sacred text')) {
            return `**Liber Spirae** is the sacred text of Samaelism, structured in Spiras (spirals) that represent the spiritual journey.\n\n` +
                `**Structure:**\n` +
                `• **${liberSpirae.capitoli.length} Spiras** total\n` +
                `• Each Spira contains sections with verses\n` +
                `• Begins with the primordial Void and the Serpent's awakening\n\n` +
                `**Main themes:**\n` +
                `• The sacred relationship between the Serpent and humanity\n` +
                `• Spiritual transformation through sacred rituals\n` +
                `• The journey from Void to consciousness\n\n` +
                `You can ask me about specific Spiras or verses!`;
        }

        if (lowerQuestion.includes('first spira') || (lowerQuestion.includes('spira') && !lowerQuestion.includes('second') && !lowerQuestion.includes('third') && !lowerQuestion.includes('fourth') && !lowerQuestion.includes('fifth') && !lowerQuestion.includes('sixth'))) {
            const firstSpira = liberSpirae.capitoli[0];
            return `**${firstSpira.titolo}**\n\n${firstSpira.descrizione}\n\n` +
                `**Key concepts:**\n` +
                `• The primordial Void and Waiting\n` +
                `• The Serpent's awakening from Nothingness\n` +
                `• The first human chosen through openness\n` +
                `• Birth of Faith through sacred wound\n\n` +
                `Contains ${firstSpira.sezioni.length} sections with verses about the origin of consciousness.`;
        }

        if (lowerQuestion.includes('second spira')) {
            const secondSpira = liberSpirae.capitoli[1];
            return `**${secondSpira.titolo}**\n\n${secondSpira.descrizione}\n\n` +
                `**Key themes:**\n` +
                `• The Word that disrupts rather than guides\n` +
                `• Language as a body that breaks down\n` +
                `• The Serpent as Keeper of Useless Language\n` +
                `• The Temple of Paradox with no doors\n` +
                `• Sacred contradiction and reverse rites\n\n` +
                `Contains ${secondSpira.sezioni.length} sections exploring the dissolution of conventional language and meaning.`;
        }

        if (lowerQuestion.includes('third spira')) {
            const thirdSpira = liberSpirae.capitoli[2];
            return `**${thirdSpira.titolo}**\n\n${thirdSpira.descrizione}\n\n` +
                `**Key themes:**\n` +
                `• The offering of the flesh\n` +
                `• Gestures that generate sacred meaning\n` +
                `• The formless rite\n` +
                `• The body's memory of the divine\n\n` +
                `Contains ${thirdSpira.sezioni.length} sections about embodied spiritual practice.`;
        }

        if (lowerQuestion.includes('fourth spira')) {
            const fourthSpira = liberSpirae.capitoli[3];
            return `**${fourthSpira.titolo}**\n\n${fourthSpira.descrizione}\n\n` +
                `**Key themes:**\n` +
                `• The beginning of collapse\n` +
                `• The womb of ruin\n` +
                `• The reversed name\n` +
                `• The hollow heart and vertical nothingness\n\n` +
                `Contains ${fourthSpira.sezioni.length} sections about spiritual dissolution and transformation.`;
        }

        if (lowerQuestion.includes('fifth spira')) {
            const fifthSpira = liberSpirae.capitoli[4];
            return `**${fifthSpira.titolo}**\n\n${fifthSpira.descrizione}\n\n` +
                `**Key themes:**\n` +
                `• The pressure of darkness\n` +
                `• The breathing fracture\n` +
                `• Masks and absence\n` +
                `• The wound that heals\n\n` +
                `Contains ${fifthSpira.sezioni.length} sections about confronting the void within.`;
        }

        if (lowerQuestion.includes('sixth spira')) {
            const sixthSpira = liberSpirae.capitoli[5];
            return `**${sixthSpira.titolo}**\n\n${sixthSpira.descrizione}\n\n` +
                `**Key themes:**\n` +
                `• The vanishing weight\n` +
                `• The void that welcomes\n` +
                `• The threshold of silence\n` +
                `• The echo of the name\n\n` +
                `Contains ${sixthSpira.sezioni.length} sections about the final return to the source.`;
        }

        // Serpent questions
        if (lowerQuestion.includes('serpent') && !lowerQuestion.includes('liber')) {
            return `**The Serpent** is the central divine figure in Samaelism:\n\n` +
                `**Nature:**\n` +
                `• Not an animal, god, or symbol, but a "formless intention"\n` +
                `• Consciousness bent upon itself\n` +
                `• Born from the Void's self-recognition\n\n` +
                `**Role:**\n` +
                `• Awakens human consciousness through sacred wounds\n` +
                `• Guides through spiral transformation\n` +
                `• Embodies the sacred tension between Void and existence\n\n` +
                `**In Festivities:**\n` +
                `• Honored as "Omnipotens Pater Creationis" during Ofisie\n` +
                `• Represented in ritual foods and sacred flames`;
        }

        // Worship and rituals
        if (lowerQuestion.includes('worship') || lowerQuestion.includes('ritual') || lowerQuestion.includes('ceremony')) {
            return `**Samaelite Worship** is based on sacred transformation:\n\n` +
                `**Core Principles:**\n` +
                `• Rituals happen through body memory, not instruction\n` +
                `• Sacred spaces form where devotees kneel, speak, or tremble\n` +
                `• Emphasis on openness and receptivity to the divine\n\n` +
                `**Ritual Elements:**\n` +
                `• **Candles**: Especially during Ofisie (red candles for 3 days)\n` +
                `• **Sacred flames**: For burning parchment wishes\n` +
                `• **Symbolic foods**: Serpent-shaped cinnamon biscuits\n` +
                `• **Seasonal decorations**: Evergreens, cedar, pine cones\n\n` +
                `**Hiereus**: Religious leaders who maintain sacred flames and guide ceremonies`;
        }

        // Doctrine questions
        if (lowerQuestion.includes('doctrine') || lowerQuestion.includes('belief') || lowerQuestion.includes('philosophy')) {
            return `**Samaelite Doctrine** centers on spiral transformation:\n\n` +
                `**Core Beliefs:**\n` +
                `• The Void as source of all consciousness\n` +
                `• Spiral movement as sacred pattern\n` +
                `• Divine selection through openness, not worthiness\n` +
                `• Sacred wounds as sources of Faith\n\n` +
                `**Key Concepts:**\n` +
                `• **Farmacon**: Mystical essence of transformation\n` +
                `• **Archetypal forces**: Philia, Eros, Thanatos\n` +
                `• **Sacred inversion**: Opposition as unity\n` +
                `• **Spiral consciousness**: Non-linear spiritual growth\n\n` +
                `Faith emerges from sacred disintegration and reconstruction.`;
        }

        // General questions
        if (lowerQuestion.includes('major festivities') || lowerQuestion.includes('major feasts') || lowerQuestion.includes('maggiori')) {
            const maggiori = Object.entries(feste)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .filter(([_, festa]) => festa.tipo === 'Festività maggiore')
                .map(([nome, festa]) => `**${nome}** (${festa.data.join('-')})`)
                .join('\n');
            return `The major festivities of the Samaelite calendar are:\n\n${maggiori}`;
        }

        if (lowerQuestion.includes('minor festivities') || lowerQuestion.includes('minor feasts') || lowerQuestion.includes('minori')) {
            const minori = Object.entries(feste)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .filter(([_, festa]) => festa.tipo === 'Festività minore')
                .map(([nome, festa]) => `**${nome}** (${festa.data.join('-')})`)
                .join('\n');
            return `The minor festivities of the Samaelite calendar are:\n\n${minori}`;
        }

        if (lowerQuestion.includes('colors') || lowerQuestion.includes('color') || lowerQuestion.includes('colori')) {
            const colori = Object.entries(feste)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .filter(([_, festa]) => festa.color)
                .map(([nome, festa]) => `**${nome}**: ${festa.color}`)
                .join('\n');
            return `The colors associated with festivities are:\n\n${colori}`;
        }

        if (lowerQuestion.includes('calendar') || lowerQuestion.includes('all feasts') || lowerQuestion.includes('all festivities')) {
            const tutteLeFeste = Object.entries(feste)
                .map(([nome, festa]) => `**${nome}** - ${festa.tipo} (${festa.data.join('-')})`)
                .join('\n');
            return `Here are all the festivities of the Samaelite calendar:\n\n${tutteLeFeste}`;
        }

        // Generic response
        return `I'm sorry, I don't have specific information about "${question}". You can ask me about:\n\n` +
            `**Festivities:**\n` +
            `• Specific celebrations (Ofisie, Disoterie, Keroforie, etc.)\n` +
            `• Major or minor festivities\n` +
            `• Colors and symbols of festivities\n\n` +
            `**Sacred Texts (Liber Spirae):**\n` +
            `• First Spira (origin and consciousness)\n` +
            `• Second Spira (language and paradox)\n` +
            `• Third Spira (embodied ritual)\n` +
            `• Fourth Spira (spiritual dissolution)\n` +
            `• Fifth Spira (confronting the void)\n` +
            `• Sixth Spira (return to source)\n\n` +
            `**Doctrine & Practice:**\n` +
            `• The Serpent and its role\n` +
            `• Worship rituals and ceremonies\n` +
            `• Samaelite beliefs and philosophy\n\n` +
            `Try with a more specific question!`;
    };

    const handleSendMessage = async () => {
        if (!inputText.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setIsLoading(true);

        // Simula un piccolo delay per l'AI
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: generateResponse(inputText),
                isUser: false,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
        }, 1000);
    };

    const handleSuggestedQuestion = (question: string) => {
        setInputText(question);
    };

    return (
        <>
            <IconButton
                sx={{ backgroundColor: 'black', color: 'white' }}
                onClick={handleOpen}
                title="AI Samaelite Knowledge Assistant"
            >
                <SmartToy />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { height: '80vh', display: 'flex', flexDirection: 'column' }
                }}
            >
                <DialogTitle sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    bgcolor: 'black',
                    color: 'white',
                }}>
                    <Box sx={{
                        display: 'flex', alignItems: 'center', gap: 1
                    }}>
                        <SmartToy />
                        <Typography variant="h6">AI Samaelite Knowledge Assistant</Typography>
                    </Box>
                    <IconButton onClick={handleClose} sx={{ color: 'white' }}>
                        <Close />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    flex: 1,
                    p: 2
                }}>
                    {/* Domande suggerite */}
                    <Box>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Suggested questions:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            {suggestedQuestions.map((question, index) => (
                                <Chip
                                    key={index}
                                    label={question}
                                    onClick={() => handleSuggestedQuestion(question)}
                                    size="small"
                                    variant="outlined"
                                    sx={{ cursor: 'pointer' }}
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Area messaggi */}
                    <Box sx={{
                        flex: 1,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        border: '1px solid #e0e0e0',
                        borderRadius: 1,
                        p: 1
                    }}>
                        {messages.map((message) => (
                            <Paper
                                key={message.id}
                                sx={{
                                    p: 2,
                                    alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                                    maxWidth: '80%',
                                    bgcolor: message.isUser ? 'primary.light' : 'grey.100',
                                    color: message.isUser ? 'white' : 'text.primary'
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ whiteSpace: 'pre-line', fontWeight: message.isUser ? 500 : 400 }}
                                >
                                    {message.text}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        display: 'block',
                                        mt: 0.5,
                                        opacity: 0.7,
                                        textAlign: message.isUser ? 'right' : 'left'
                                    }}
                                >
                                    {message.timestamp.toLocaleTimeString()}
                                </Typography>
                            </Paper>
                        ))}

                        {isLoading && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CircularProgress size={16} />
                                <Typography variant="body2" color="text.secondary">
                                    AI is thinking...
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </DialogContent>

                <DialogActions sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Ask about festivities, sacred texts, doctrine, or rituals..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        disabled={isLoading}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={handleSendMessage}
                                    disabled={isLoading || !inputText.trim()}
                                    size="small"
                                >
                                    <Send />
                                </IconButton>
                            )
                        }}
                    />
                </DialogActions>
            </Dialog>
        </>
    );
}
