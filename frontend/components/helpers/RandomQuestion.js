const questions = [
	"Hey",
	"Hi",
	"Tell me a Joke",
	"How are you ?",
	"Hola how are you?",
	"Thank you",
	"Shit",
	"I need cheering up",
	"You are very intelligent",
];

const randomQuestion = () => {
	return questions[Math.floor(Math.random() * questions.length)];
};

export default randomQuestion;
