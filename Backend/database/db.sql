CREATE DATABASE bookly;

CREATE TABLE genres (
  genreId serial PRIMARY KEY,
  genreName VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE books (
  bookId serial PRIMARY KEY,
  bookTilte VARCHAR(50) NOT NULL,
  bookAuthor VARCHAR(50) NOT NULL,
  bookISBN VARCHAR(50) UNIQUE NOT NULL,
  bookImage VARCHAR(250),
  bookDescription VARCHAR,
  bookReleaseYear INT,
  bookLanguage VARCHAR(50)
);

CREATE TABLE users (
  userId serial PRIMARY KEY,
  userFullName VARCHAR(50) NOT NULL,
  userEmail VARCHAR(50) UNIQUE NOT NULL,
  userProfilePicture VARCHAR(250), -- maybe change
  useruserName VARCHAR(50) UNIQUE NOT NULL ,
  userPassword VARCHAR(50) NOT NULL
);


CREATE TABLE reviews (
  reviewdId serial PRIMARY KEY,
  reviewContent VARCHAR NOT NULL,
  reviewUserId INT NOT NULL,
  reviewBookId INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reviewUserId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (reviewBookId) REFERENCES books(bookId) ON DELETE CASCADE
);

CREATE TABLE bookGenres (
  bookGenreId serial PRIMARY KEY,
  bookGenreBookId INT NOT NULL,
  bookGenreGenreId INT NOT NULL,
  FOREIGN KEY (bookGenreBookId) REFERENCES books(bookId),
  FOREIGN KEY (bookGenreGenreId) REFERENCES genres(genreId)
);

CREATE TABLE userBooks (
  userBookId serial PRIMARY KEY,
  userBookUserId INT NOT NULL,
  userBookBookId INT NOT NULL,
  FOREIGN KEY (userBookUserId) REFERENCES users(userId),
  FOREIGN KEY (userBookBookId) REFERENCES books(bookId)
);

INSERT INTO genres (genreName) VALUES
('Fiktion'),
('Icke-fiktion'),
('Mysterier'),
('Fantasy'),
('Science Fiction'),
('Biografier'),
('Självhjälp'),
('Historiska romaner'),
('Romantik'),
('Ungdomslitteratur');

INSERT INTO books (bookTilte, bookAuthor, bookISBN, bookImage, bookDescription, bookReleaseYear, bookLanguage) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 'https://bilder.akademibokhandeln.se/images_akb/9781847496140_383/the-great-gatsby', 'Det är sommaren 1922 och Nick Carraway flyttar till ett yrvaket New York för att göra karriär. I West Egg på Long Island hyr han en villa intill ett av öns mest praktfulla hus. Ett sagolikt palats under vildvuxen murgröna. Från dess blå trädgård hörs musik nätterna igenom och stadens societet kommer och går i en aldrig sinande ström. Festerna är magnifika, de är omtalade, oändliga, men ingen tyckts veta vem mannen bakom dem egentligen är.

En tidig lördagsmorgon står en uniformsklädd herre på Nicks gräsmatta. Med sig har han en handskriven inbjudan, undertecknad Jay Gatsby.', 1925, 'Engelska'),
('Sapiens: A Brief History of Humankind', 'Yuval Noah Harari', '9780062316097', 'https://bilder.akademibokhandeln.se/images_akb/9780062316110_383/sapiens', 'För cirka 70 000 år sedan var jorden befolkad av minst sex olika mänskliga arter. Ingen av dem hade någon större inverkan på den globala ekologin. Idag har bara en art överlevt - Homo sapiens. Hur blev det så? En del av hemligheten bakom framgångarna är att vi är det enda djur som kan prata om saker som existerar enbart i vår egen fantasi, såsom gudar, nationer, pengar och mänskliga rättigheter. Om detta och mycket mer handlar denna internationella bästsäljare som ger nytt bränsle åt diskussionen om vårt gemensamma förflutna och planetens framtid.

Professor Yuval Noah Harari (född 1976) är verksam vid Hebreiska universitetet i Jerusalem och slutförde sin doktorsavhandling vid University of Oxford. Hans specialområde är världens historia och makrohistoriska processer. Harari har publicerat ett flertal böcker och artiklar och hans filmade föreläsningar om världens historia har blivit en stor succé på Youtube', 2011, 'Engelska'),
('Gone Girl', 'Gillian Flynn', '9780307588371', 'https://bilder.akademibokhandeln.se/images_akb/9780385347778_383/gone-girl', 'How well do you know your lover? The art of marriage truly is the art of war in the new novel from the CWA AWARD-winning author of SHARP OBJECTS and DARK PLACES.', 2012, 'Engelska'),
('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', '9780439708180', 'https://bilder.akademibokhandeln.se/images_akb/9781408855652_383/harry-potter-and-the-philosophers-stone', '"Harry Potter och de vises sten" av J.K. Rowling är en magisk och fängslande berättelse som introducerar läsare till den förtrollande världen av Hogwarts skola för häxkonster och trolldom. Rowlings fantasifulla berättarkonst väver samman en förtrollande berättelse fylld av vänskap, mod och kampen mellan gott och ont. När Harry Potter ger sig ut på sin extraordinära resa förflyttas läsarna till en värld av förundran, där de möter minnesvärda karaktärer, ställs inför spännande utmaningar och upptäcker den sanna kraften i kärlek och uthållighet. Denna tidlösa klassiker är ett måste att läsa för både unga och vuxna läsare och väcker en livslång kärlek för den magiska världen.', 1997, 'Engelska'),
('Dune', 'Frank Herbert', '9780441013593', 'https://bilder.akademibokhandeln.se/images_akb/9780340960196_383/dune', 'Melange är det mest eftertraktade ämnet i universum: en drog som kan förlänga människors liv och berika det med ett multidimensionellt medvetande, det sista en förutsättning för navigering under interstellära rymdresor. Melange finns bara på den karga ökenplaneten Arrakis.
När kejsaren tar ifrån adelsfamiljen Harkonnen vasallskapet för att i stället ge planeten i förläning till familjen Atreides slår Harkonnen tillbaka och mördar fursten Leto Atreides. Sonen Paul flyr ut i öknen med sin mor lady Jessica och de räddas från att törsta ihjäl av Arrakis ursprungsfolk. Paul måste vinna arrakisfolkets tillit innan han kan leda upproret mot familjen Harkonnen.
Berättelsen om kampen om herraväldet över Arrakis är en storslagen och oavbrutet fängslande historia om makthunger, religion, svek, teknologisk övertro och begränsade naturtillgångar.', 1965, 'Engelska'),
('Becoming', 'Michelle Obama', '9781524763138', 'https://bilder.akademibokhandeln.se/images_akb/9780241982976_383/becoming', 'An intimate, powerful, and inspiring memoir; 17 million copies sold worldwide Now in paperback featuring a new introduction by Michelle Obama, a letter from the author to her younger self, and a book club guide with 20 discussion questions and a 5-question Q&A, the intimate, powerful, and inspiring memoir by the former First Lady of the United States In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world, chronicling the experiences that have shaped her from her childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work, to her time spent at the world's most famous address. With unerring honesty and lively wit, she describes her triumphs and her disappointments, both public and private, telling her full story as she has lived it -- in her own words and on her own terms. Warm, wise, and revelatory, Becoming is the deeply personal reckoning of a woman of soul and substance who has steadily defied expectations -- and whose story inspires us to do the same. MICHELLE OBAMA'S NEXT BOOK, THE LIGHT WE CARRY, IS OUT NOW! *One of Goodreads Most Popular Books of the Past Decade* Sunday Times bestseller, November 2018', 2018, 'Engelska'),
('The Power of Habit', 'Charles Duhigg', '9780812981605', 'https://bilder.akademibokhandeln.se/images_akb/9781847946249_383/the-power-of-habit', 'Theres never been a better time to set new habits. This book will change your life. In The Power of Habit, award-winning journalist Charles Duhigg takes us into the thrilling and surprising world of the scientific study of habits. He examines why some people and companies struggle to change, despite years of trying, while others seem to remake themselves overnight. He visits laboratories where neuroscientists explore how habits work and where, exactly, they reside in our brains. And he uncovers how the right habits were crucial to the success of Olympic swimmer Michael Phelps, Starbucks CEO Howard Schultz, and civil-rights hero Martin Luther King, Jr. The result is a compelling argument and an empowering discovery: the key to exercising regularly, losing weight, raising exceptional children, becoming more productive or even building revolutionary companies is understanding how habits work. By harnessing this new science, we can transform our businesses, our communities, and our lives.', 2012, 'Engelska'),
('The Book Thief', 'Markus Zusak', '9780375831003', 'https://bilder.akademibokhandeln.se/images_akb/9781909531611_383/the-book-thief', 'SPECIAL 10TH ANNIVERSARY EDITION with exclusive extra behind-the-scenes material from the author It is 1939. In Nazi Germany, the country is holding its breath. Death has never been busier - and will become busier still. By her brother's graveside, Liesel's life is changed forever when she picks up a single object, abandoned in the snow. It is The Gravedigger's Handbook, and this is her first act of book thievery. So begins Liesel's love affair with books and words, and soon she is stealing from Nazi book-burnings, the mayor's wife's library . . . wherever there are books to be found. But these are dangerous times, and when Liesel's foster family hides a Jew in their basement, nothing will ever be the same again. In superbly crafted writing that burns with intensity, award-winning author Markus Zusak has given us one of the most enduring stories of our time. Now a major film from Twentieth-Century Fox starring Geoffrey Rush and Emily Watson.', 2005, 'Engelska'),
('Pride and Prejudice', 'Jane Austen', '9781853260001', 'https://bilder.akademibokhandeln.se/images_akb/9789180947862_383/pride-and-prejudice', 'The love between Elizabeth Bennet and Fitzwilliam Darcy is a struggle. He has his pride, while she has a pragmatic view of the world. When they come together their most stubborn sides are bound to clash, but by challenging each other they also build a remarkable relationship. Jane Austen's Victorian novel depicts romantic relationships as a means of power, with multifaceted and changeable characters, and with environments and landscapes which are equally vividly drawn. Not for nothing is Pride and Prejudice one of the most read and talked-about novels in world literature. JANE AUSTEN [1775-1817] was an English author. Her novels are set in the English nobility, which is often portrayed with sharp irony. Social rules and codes are depicted as barriers to finding happiness, especially for women. Jane Austen is one of the most beloved authors of all time.', 1813, 'Engelska'),
('The Hunger Games', 'Suzanne Collins', '9780439023528', 'https://bilder.akademibokhandeln.se/images_akb/9781407132082_383/the-hunger-games', 'The first book in the ground-breaking Hunger Games trilogy. "A violent, jarring, speed-rap of a novel that generates nearly constant suspense. . . . I couldn't stop reading." Stephen King, Entertainment Weekly "I was so obsessed with this book. . . . The Hunger Games is amazing." Stephenie Meyer, author of the Twilight saga "Brilliantly plotted and perfectly paced." John Green, The New York Times Book Review Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature. A major feature film starring Jennifer Lawrence, Josh Hutcherson & Liam Hemsworth Three books, four films and one worldwide phenomenon, The Hunger Games changed the face of global YA. The best-selling prequel to The Hunger Games, The Ballard of Songbirds and Snakes, is soon to be a major feature film releasing in November 2023. OTHER BOOKS IN THE SERIES Catching Fire Mockingjay The Ballard of Songbirds and Snakes', 2008, 'Engelska'),
('1984', 'George Orwell', '9780451524935', 'https://bilder.akademibokhandeln.se/images_akb/9780141036144_383/1984', 'The perfect edition for any Orwell enthusiasts' collection, discover the classic dystopian masterpiece beautifully reimagined by renowned street artist Shepard Fairey Winston Smith works for the Ministry of Truth in London, chief city of Airstrip One. Big Brother stares out from every poster, the Thought Police uncover every act of betrayal. When Winston finds love with Julia, he discovers that life does not have to be dull and deadening, and awakens to new possibilities. Despite the police helicopters that hover and circle overhead, Winston and Julia begin to question the Party; they are drawn towards conspiracy. Yet Big Brother will not tolerate dissent - even in the mind. For those with original thoughts they invented Room 101. . . First published in 1949, 1984 is George Orwell's terrifying vision of a totalitarian future in which everything and everyone is slave to a tyrannical regime. 'Right up there among my favourite books . . . I read it again and again' Margaret Atwood 'More relevant to today than almost any other book that you can think of' Jo Brand COMPLETE THE TRIO WITH SHEPARD FAIREY'S NEW-LOOK ANIMAL FARM AND DOWN AND OUT IN PARIS AND LONDON.', 1949, 'Engelska'),
('Educated', 'Tara Westover', '9780399590504', 'https://bilder.akademibokhandeln.se/images_akb/9780099511021_383/educated', 'THE MULTI-MILLION COPY BESTSELLER A BETWEEN THE COVERS PICK Selected as a book of the year by AMAZON, THE TIMES, SUNDAY TIMES, GUARDIAN, NEW YORK TIMES, ECONOMIST, NEW STATESMAN, VOGUE, IRISH TIMES, IRISH EXAMINER and RED MAGAZINE 'One of the best books I have ever read . . . unbelievably moving' Elizabeth Day 'An extraordinary story, beautifully told' Louise O'Neill 'A memoir to stand alongside the classics . . . compelling and joyous' Sunday Times Tara Westover grew up preparing for the end of the world. She was never put in school, never taken to the doctor. She did not even have a birth certificate until she was nine years old. At sixteen, to escape her father's radicalism and a violent older brother, Tara left home. What followed was a struggle for self-invention, a journey that gets to the heart of what an education is and what it offers: the perspective to see one's life through new eyes, and the will to change it. 'It will make your heart soar' Guardian 'Jaw-dropping and inspiring, everyone should read this book' Stylist 'Absolutely superb . . . so gripping I could hardly breathe' Sophie Hannah', 2018, 'Engelska'),
('The Da Vinci Code', 'Dan Brown', '9780307474278', 'https://bilder.akademibokhandeln.se/images_akb/9780552161275_383/the-da-vinci-code', 'Harvard professor Robert Langdon receives an urgent late-night phone call while on business in Paris: the elderly curator of the Louvre has been brutally murdered inside the museum. Alongside the body, police have found a series of baffling codes. As Langdon and a gifted French cryptologist, Sophie Neveu, begin to sort through the bizarre riddles, they are stunned to find a trail that leads to the works of Leonardo Da Vinci - and suggests the answer to a mystery that stretches deep into the vault of history. Unless Langdon and Neveu can decipher the labyrinthine code and quickly assemble the pieces of the puzzle, a stunning historical truth will be lost forever...', 2003, 'Engelska'),
('The Hobbit', 'J.R.R. Tolkien', '9780345339683', 'https://bilder.akademibokhandeln.se/images_akb/9780261102217_383/the-hobbit', 'The popular paperback edition of J.R.R. Tolkien's classic masterpiece, illustrated for the first time with Tolkien's own painting originally created by him for the first edition, and featuring brand new reproductions of all his drawings and maps. The Hobbit is a tale of high adventure, undertaken by a company of dwarves in search of dragon-guarded gold. A reluctant partner in this perilous quest is Bilbo Baggins, a comfort-loving unambitious hobbit, who surprises even himself by his resourcefulness and skill as a burglar. Encounters with trolls, goblins, dwarves, elves and giant spiders, conversations with the dragon, Smaug, and a rather unwilling presence at the Battle of Five Armies are just some of the adventures that befall Bilbo. Bilbo Baggins has taken his place among the ranks of the immortals of children's fiction. Written by Professor Tolkien for his own children, The Hobbit met with instant critical acclaim when published.', 1937, 'Engelska'),
('The Alchemist', 'Paulo Coelho', '9780062315007', 'https://bilder.akademibokhandeln.se/images_akb/9780008144227_383/the-alchemist', 'A global phenomenon, The Alchemist has been read and loved by over 62 million readers, topping bestseller lists in 74 countries worldwide. Now this magical fable is beautifully repackaged in an edition that lovers of Paulo Coelho will want to treasure forever. Every few decades a book is published that changes the lives of its readers forever. This is such a book a beautiful parable about learning to listen to your heart, read the omens strewn along lifes path and, above all, follow your dreams. Santiago, a young shepherd living in the hills of Andalucia, feels that there is more to life than his humble home and his flock. One day he finds the courage to follow his dreams into distant lands, each step galvanised by the knowledge that he is following the right path: his own. The people he meets along the way, the things he sees and the wisdom he learns are life-changing. With Paulo Coelhos visionary blend of spirituality, magical realism and folklore, The Alchemist is a story with the power to inspire nations and change peoples lives.', 1988, 'Engelska');

INSERT INTO bookGenres (bookGenreBookId, bookGenreGenreId) VALUES
(1, 1),  -- The Great Gatsby -> Fiktion
(2, 2),  -- Sapiens -> Icke-fiktion
(3, 3),  -- Gone Girl -> Mysterier
(4, 4),  -- Harry Potter and the Sorcerer's Stone -> Fantasy
(5, 5),  -- Dune -> Science Fiction
(6, 6),  -- Becoming -> Biografier
(7, 7),  -- The Power of Habit -> Självhjälp
(8, 8),  -- The Book Thief -> Historiska romaner
(9, 9),  -- Pride and Prejudice -> Romantik
(10, 10), -- The Hunger Games -> Ungdomslitteratur
(11, 1), -- 1984 -> Fiktion
(12, 6), -- Educated -> Biografier
(13, 3), -- The Da Vinci Code -> Mysterier
(14, 4), -- The Hobbit -> Fantasy
(15, 2); -- The Alchemist -> Icke-fiktion

INSERT INTO users (userFullName, userEmail, userProfilePicture, useruserName, userPassword) VALUES
('Erik Svensson', 'erik.svensson@email.com', NULL, 'erik.svensson', 'password123'),
('Anna Karlsson', 'anna.karlsson@email.com', NULL, 'anna.karlsson', 'password123'),
('Lena Andersson', 'lena.andersson@email.com', NULL, 'lena.andersson', 'password123'),
('Oskar Lindberg', 'oskar.lindberg@email.com', NULL, 'oskar.lindberg', 'password123'),
('Emil Johansson', 'emil.johansson@email.com', NULL, 'emil.johansson', 'password123'),
('Sara Eriksson', 'sara.eriksson@email.com', NULL, 'sara.eriksson', 'password123'),
('Hanna Berg', 'hanna.berg@email.com', NULL, 'hanna.berg', 'password123'),
('Johan Larsson', 'johan.larsson@email.com', NULL, 'johan.larsson', 'password123');
