let stopWords = [
  "a",
  "able", "about", "above", "abst", "accordance", "according",
  "accordingly", "across", "act", "actually", "added", "adj",
  "affected", "affecting", "affects", "after", "afterwards", "again",
  "against", "ah", "all", "almost", "alone", "along", "already", "also",
  "although", "always", "am", "among", "amongst", "an", "and",
  "announce", "another", "any", "anybody", "anyhow", "anymore",
  "anyone", "anything", "anyway", "anyways", "anywhere", "apparently",
  "approximately", "are", "aren", "aren't", "arise", "around", "as",
  "aside", "ask", "asking", "at", "auth", "available", "away",
  "awfully",

  "b",
  "back", "be", "became", "because", "become",
  "becomes", "becoming", "been", "before", "beforehand", "begin",
  "beginning", "beginnings", "begins", "behind", "being", "believe",
  "below", "beside", "besides", "between", "beyond", "biol", "both",
  "brief", "briefly", "but", "by",

  "c",
  "ca", "came", "can", "cannot",
  "can't", "cause", "causes", "certain", "certainly", "co", "com",
  "come", "comes", "contain", "containing", "contains", "could",
  "couldn't",

  "d",
  "date", "did", "didn't", "different", "do", "does",
  "doesn't", "doing", "done", "don't", "down", "downwards", "due",
  "during",

  "e",
  "each", "ed", "edu", "effect", "eg", "eight", "eighty",
  "either", "else", "elsewhere", "end", "ending", "enough",
  "especially", "et", "et-al", "etc", "even", "ever", "every",
  "everybody", "everyone", "everything", "everywhere", "ex", "except",

  "f",
  "far", "few", "ff", "fifth", "first", "five", "fix", "followed",
  "following", "follows", "for", "former", "formerly", "forth", "found",
  "four", "from", "further", "furthermore",

  "g",
  "gave", "get", "gets",
  "getting", "give", "given", "gives", "giving", "go", "goes", "gone",
  "got", "gotten",

  "h",
  "had", "happens", "hardly", "has", "hasn't",
  "have", "haven't", "having", "he", "hed", "hence", "her", "here",
  "hereafter", "hereby", "herein", "heres", "hereupon", "hers",
  "herself", "hes", "hey", "hi", "hid", "him", "himself", "his", "hither",
  "home", "how", "howbeit", "however", "hundred",

  "i",
  "i'd", "ie", "if",
  "i'll", "i'm", "immediate", "immediately", "importance", "important",
  "in", "inc", "indeed", "index", "information", "instead", "into",
  "invention", "inward", "is", "isn't", "it", "it'd", "it'll", "its",
  "itself", "i've",

  "j",
  "just",

  "k",
  "keep", "keeps", "kept", "kg", "km",
  "know", "known", "knows",

  "l",
  "largely", "last", "lately", "later",
  "latter", "latterly", "least", "less", "lest", "let", "let's", "like",
  "liked", "likely", "line", "little", "'ll", "look", "looking",
  "looks", "ltd",

  "m",
  "made", "mainly", "make", "makes", "many", "may",
  "maybe", "me", "mean", "means", "meantime", "meanwhile", "merely",
  "mg", "might", "million", "miss", "ml", "more", "moreover", "most",
  "mostly", "mr", "mrs", "much", "mug", "must", "my", "myself",

  "n",
  "na", "name", "namely", "nay", "nd", "nt", "near", "nearly", "necessarily",
  "necessary", "need", "needs", "neither", "never", "nevertheless",
  "new", "next", "nine", "ninety", "no", "nobody", "non", "none",
  "nonetheless", "noone", "nor", "normally", "nos", "not", "noted",
  "nothing", "now", "nowhere",

  "o",
  "obtain", "obtained", "obviously",
  "of", "off", "often", "oh", "ok", "okay", "old", "omitted", "on",
  "once", "one", "ones", "only", "onto", "or", "ord", "other", "others",
  "otherwise", "ought", "our", "ours", "ourselves", "out", "outside",
  "over", "overall", "owing", "own",

  "p",
  "page", "pages", "part",
  "particular", "particularly", "past", "per", "perhaps", "placed",
  "please", "plus", "poorly", "possible", "possibly", "potentially",
  "pp", "predominantly", "present", "previously", "primarily",
  "probably", "promptly", "proud", "provides", "put",

  "q",
  "que",
  "quickly", "quite", "qv",

  "r",
  "ran", "rather", "rd", "re", "readily",
  "really", "recent", "recently", "ref", "refs", "regarding",
  "regardless", "regards", "related", "relatively", "research",
  "respectively", "resulted", "resulting", "results", "right", "run",

  "s",
  "said", "same", "saw", "say", "saying", "says", "sec", "section",
  "see", "seeing", "seem", "seemed", "seeming", "seems", "seen",
  "self", "selves", "sent", "seven", "several", "shall", "she", "she'd",
  "she'll", "she's", "should", "shouldn't", "show", "showed", "shown",
  "showns", "shows", "significant", "significantly", "similar",
  "similarly", "since", "six", "slightly", "so", "some", "somebody",
  "somehow", "someone", "somethan", "something", "sometime",
  "sometimes", "somewhat", "somewhere", "soon", "sorry", "specifically",
  "specified", "specify", "specifying", "still", "stop", "strongly",
  "sub", "substantially", "successfully", "such", "sufficiently",
  "suggest", "sup", "sure",

  "t",
  "take", "taken", "taking", "tell",
  "tends", "th", "than", "thank", "thanks", "thanx", "that", "that'll",
  "that's", "that've", "the", "their", "theirs", "them", "themselves",
  "then", "thence", "there", "thereafter", "thereby", "there'd",
  "therefore", "therein", "there'll", "thereof", "there're", "there's",
  "thereto", "thereupon", "there've", "these", "they", "they'd",
  "they'll", "they're", "they've", "think", "this", "those", "thou",
  "though", "thoughh", "thousand", "throug", "through", "throughout",
  "thru", "thus", "til", "tip", "to", "together", "too", "took",
  "toward", "towards", "tried", "tries", "truly", "try", "trying", "ts",
  "twice", "two",

  "u",
  "un", "under", "unfortunately", "unless",
  "unlike", "unlikely", "until", "unto", "up", "upon", "ups", "us",
  "use", "used", "useful", "usefully", "usefulness", "uses", "using",
  "usually",

  "v",
  "value", "various", "'ve", "very", "via", "viz",
  "vol", "vols", "vs",

  "w",
  "want", "wants", "was", "wasn't", "way",
  "we", "we'd", "welcome", "we'll", "went", "were", "weren't", "we've",
  "what", "whatever", "what'll", "whats", "when", "whence", "whenever",
  "where", "whereafter", "whereas", "whereby", "wherein", "where's",
  "whereupon", "wherever", "whether", "which", "while", "whim",
  "whither", "who", "who'd", "whoever", "whole", "who'll", "whom",
  "whomever", "who's", "whose", "why", "widely", "willing", "wish",
  "with", "within", "without", "won't", "words", "world", "would",
  "wouldnt", "www",

  "x",

  "y"
  , "yes", "yet", "you", "you'd", "you'll",
  "your", "you're", "your's", "yourself", "yourselves", "you've",

  "z",
  "zero"
];

const removePunctuation = (string) => {
  return string.replace(/[\.\!\?\,\:]/gim, '');
};

const removeBrackets = (string) => {
  return string.replace(/[\[\]\(\)\{\}\<\>]/gim, ' ');
};

const removeNewLines = (string) => {
  return string.replace(/\n+/gim, ' ');
};

const unquoteWords = (string) => {
  return string.replace(/(\s'|'\s|\s"|"\s)/gim, " ");
}

const removeSymbols = (string) => {
  return string.replace(/[\~\-\&\/\=\;]/gim, " ");
}

const removeSpaces = (string) => {
  return string.replace(/\s+/gim, ' ');
}

const removeStopWordsAndPunctuation = (string) => {
  string = removeNewLines(string);
  string = removePunctuation(string);
  string = removeBrackets(string);
  string = unquoteWords(string);
  string = removeSymbols(string);
  string = removeSpaces(string);

  string = string.split(' ').map(word => word.toLowerCase());
  string = string.filter((word) => !stopWords.includes(word));

  let tags = [];

  string.reduce((acc, word) => {
    if (!tags.includes(word)) {
      acc.push(word);
    }
    return acc;
  }, tags);

  return tags;
};

module.exports = {
  removeStopWordsAndPunctuation
}