// ===== READING TEXTS DATA =====
const readingTexts = [
  // Pre-A1 Level (100+ слов) — увеличено: тексты стали длиннее примерно на +50 слов
  {
    id: "text-prea1-001",
    level: "pre-a1",
    levelName: "Pre-A1",
    title: "My Cat",
    text: `I have a cat. My cat is small. It is white and black. My cat likes milk. It sleeps on my bed. I love my cat.

My cat is friendly. It likes to play with a small ball. Sometimes it runs in the room and jumps on the chair. When I come home, my cat comes to the door. It sits near me when I read a book. In the evening, I give my cat food and water. My cat is part of my family.`,
    wordCount: 79,
    status: "unread"
  },
  {
    id: "text-prea1-002",
    level: "pre-a1",
    levelName: "Pre-A1",
    title: "My Family",
    text: `This is my family. I have a mother and a father. I have one brother. His name is Tom. We live in a big house. I love my family.

My mother is kind. She cooks dinner every day. My father works a lot, but he helps at home too. Tom is funny and sometimes loud. We watch TV together in the evening. On weekends, we go to the park and take photos. I feel happy when we are together.`,
    wordCount: 86,
    status: "unread"
  },
  {
    id: "text-prea1-003",
    level: "pre-a1",
    levelName: "Pre-A1",
    title: "My Room",
    text: `This is my room. It is small but nice. I have a bed and a desk. There is a window. I can see trees from my window. I like my room.

I have a lamp on my desk. I do my homework there. I also have books and a pencil case. Near my bed, there is a small chair. My clothes are in a closet. I clean my room on Saturday. When my room is clean, I feel good and calm.`,
    wordCount: 90,
    status: "unread"
  },
  {
    id: "text-prea1-004",
    level: "pre-a1",
    levelName: "Pre-A1",
    title: "My Morning",
    text: `I wake up in the morning. I open my eyes and look at the window. I get up and wash my face. Then I brush my teeth. I put on my clothes.

I eat breakfast in the kitchen. I like bread and cheese. I drink tea or milk. After breakfast, I take my bag. I say goodbye to my family. Then I go outside. I feel ready for the day.`,
    wordCount: 78,
    status: "unread"
  },
  {
    id: "text-prea1-005",
    level: "pre-a1",
    levelName: "Pre-A1",
    title: "My Little Dog",
    text: `I have a little dog. My dog is brown. It has small ears and a long tail. My dog likes to run and play.

Every day, I walk with my dog. We go to the yard. My dog smells the grass and looks at birds. Sometimes it plays with other dogs. At home, my dog sleeps near the door. I give my dog water and food. I love my dog very much.`,
    wordCount: 85,
    status: "unread"
  },

  // A1 Level (250+ слов) — увеличено: тексты стали длиннее примерно на +50 слов
  {
    id: "text-a1-001",
    level: "a1",
    levelName: "A1",
    title: "A Day at School",
    text: `I go to school every day. I wake up at seven o'clock. I eat breakfast with my family. Then I walk to school. My school is not far from home.

At school, I have many lessons. I like English and Math. My teacher is very nice. I have many friends at school. We play together at break time.

Sometimes we have Art class. We draw pictures and make small projects. I like to use colors and scissors. In the school yard, we play football or run. The weather is often good in spring.

After school, I go home. I do my homework. Then I play with my dog. In the evening, I help my mother set the table. I go to bed at nine o'clock. I feel tired but happy.`,
    wordCount: 135,
    status: "unread"
  },
  {
    id: "text-a1-002",
    level: "a1",
    levelName: "A1",
    title: "My Best Friend",
    text: `My best friend is Anna. She is ten years old. She has long brown hair and blue eyes. She is very kind and funny.

We go to the same school. We sit together in class. We like to read books and draw pictures. Anna is very good at drawing.

After school, we often do homework together. If I don’t understand something, Anna helps me. Sometimes I help her with Math. We also like music. We listen to songs and sing quietly in my room.

On weekends, we play in the park. We ride our bikes and eat ice cream. In winter, we make a snowman and drink hot tea at home. I am happy to have such a good friend.`,
    wordCount: 131,
    status: "unread"
  },
  {
    id: "text-a1-003",
    level: "a1",
    levelName: "A1",
    title: "A Rainy Day",
    text: `Today it is raining. The sky is gray and the street is wet. I cannot play outside, so I stay at home.

In the morning, I make hot tea and eat a sandwich. Then I look out of the window and watch the rain. The drops fall on the trees and cars. It is quiet and a little cold.

After that, I read a book and listen to music. I also help my mother in the kitchen. We make soup and cut vegetables. In the afternoon, I draw a picture of my house and the garden.

In the evening, the rain stops. I put on my jacket and go for a short walk. The air is fresh and clean. I like rainy days sometimes, because I can rest and do calm things.`,
    wordCount: 138,
    status: "unread"
  }, {
  id: "text-a1-004",
  level: "a1",
  levelName: "A1",
  title: "A Small Adventure in the City",
  text: `Last Saturday I had a small adventure in my city. I wanted to buy a birthday gift for my friend Ben. He is eleven years old, and he likes drawing. I decided to go to a shop with notebooks and pencils.

In the morning I ate breakfast with my family. I drank tea and ate bread with butter. Then I took my backpack and some money. The weather was cool but sunny. I walked to the bus stop near my house. A bus came after five minutes. I paid for a ticket and sat near the window. I looked at the streets and the people.

After ten minutes I got off the bus. The shop was on a big street. There were many cars and many shops. I went inside and saw lots of colorful things. There were pens, markers, paper, and small books. I didn’t know what to choose. Then I saw a nice sketchbook with a blue cover. It looked simple, but it was красивый. I also bought a set of pencils.

When I left the shop, I felt happy. But then I noticed I didn’t know the way back. I felt a little scared. I stopped and looked around. I saw a café and a woman with a dog. I went to her and asked, “Excuse me, where is the bus stop?” My English was not perfect, but she understood me. She smiled and pointed to the next street.

I walked to the bus stop and waited. While I waited, I called my mother to tell her I was fine. The bus arrived soon. I sat down and held the gift in my hands. I looked out of the window again. I felt proud because I did everything alone.

When I came home, my family asked me about my day. I showed them the sketchbook and pencils. My mother said, “Good job!” In the evening I wrapped the gift in paper and wrote a small card. I was ready for Ben’s birthday.`,
  wordCount: 351,
  status: "unread"
},

  // Pre-A2 Level (600+ слов)
  {
    id: "text-prea2-001",
    level: "pre-a2",
    levelName: "Pre-A2",
    title: "Summer Vacation",
    text: `Last summer, I went on vacation with my family. We traveled to the seaside. The journey took five hours by car. I was very excited!

We stayed in a small hotel near the beach. Every morning, we woke up early and went swimming. The water was warm and clear. I learned how to swim better.

In the afternoon, we built sandcastles and played volleyball. My father taught me how to play. It was difficult at first, but I got better.

In the evenings, we walked along the beach and watched the sunset. We ate delicious seafood at local restaurants. I tried many new dishes.

It was the best vacation ever! I want to go back next summer.`,
    wordCount: 120,
    status: "unread"
  },
  {
    id: "text-prea2-002",
    level: "pre-a2",
    levelName: "Pre-A2",
    title: "A Busy Saturday",
    text: `On Saturday I usually wake up later than on school days. But last Saturday was very busy. In the morning, I cleaned my room and put my books on the shelf. Then I helped my father wash the car. It took a long time, but the car looked great.

After lunch, my mother asked me to go shopping with her. We bought fruit, vegetables, and bread. I carried two heavy bags, so my arms were tired. When we came home, I made tea and ate an apple. It felt nice to rest for a few minutes.

In the evening, my friend called me. We met near my house and rode our bikes. We talked about school and our plans for the summer. When I came back home, I took a shower and went to bed early. I was tired, but I felt good because I did many useful things.`,
    wordCount: 158,
    status: "unread"
  },

  // A2 Level (800+ слов)
  {
    id: "text-a2-001",
    level: "a2",
    levelName: "A2",
    title: "Moving to a New City",
    text: `Last month, my family moved to a new city. At first, I was sad because I had to leave my old friends and school behind. Everything was different and unfamiliar.

On my first day at the new school, I was very nervous. I didn't know anyone. The school building was bigger than my old one, and I got lost twice! But my new classmates were friendly and helped me find my way.

During lunch break, a girl named Sophie came to talk to me. She asked where I was from and what I liked to do. We discovered that we both loved reading and playing video games. By the end of the day, I felt much better.

Now, three weeks later, I have made several new friends. I still miss my old city sometimes, but I'm starting to feel at home here. Change can be scary, but it can also bring good surprises.`,
    wordCount: 165,
    status: "unread"
  },
  {
    id: "text-a2-002",
    level: "a2",
    levelName: "A2",
    title: "My First Part-Time Job",
    text: `This year I decided to try a part-time job. I wanted to earn some money and also learn how to be responsible. My uncle owns a small café, and he offered me work on weekends.

On my first day, I was nervous. I didn’t know where everything was, and I was afraid to make mistakes. My uncle showed me how to clean the tables and how to take simple orders. I started with easy tasks, like bringing water and wiping the menu.

After a few hours, I felt more confident. Some customers smiled at me, and that made me feel better. Of course, not everything was perfect. I once dropped a spoon, and it was embarrassing. But my uncle said it was normal.

At the end of the day, I was tired, but proud. I learned that work is not always easy, but it can be interesting. Now I save my money for a new bicycle.`,
    wordCount: 173,
    status: "unread"
  }, {
  id: "text-a2-004",
  level: "a2",
  levelName: "A2",
  title: "Yuri Gagarin: The First Man in Space",
  text: `Yuri Gagarin is famous because he was the first person to fly into space. His flight was a very important moment in history. It happened on April 12, 1961. Many people around the world still remember this date.

Gagarin was born in Russia in 1934. He grew up in a simple family, and as a young man he became a pilot. He liked flying and he studied a lot. Later he joined a special program to train astronauts. The training was not easy. The future astronauts had to be healthy, strong, and calm. They learned how to work in a small space, how to follow strict rules, and how to stay focused under pressure.

On the day of the flight, Gagarin traveled in a spacecraft called Vostok 1. It went into orbit around Earth. The whole flight was about 108 minutes, but it changed the world. During the flight, Gagarin looked at our planet from space. He saw Earth as a blue and white ball. People say he felt happy and proud, but also very responsible, because many engineers and scientists worked for this moment.

When Gagarin returned to Earth, he became a hero. People greeted him in many cities. He smiled a lot, and his smile became a symbol of hope and courage. He showed that humans could go beyond our planet and explore new places.

Today, we have modern rockets and many space missions, but Gagarin’s flight is still special. It was the first step into space for all humanity. His story teaches us that big dreams can come true when people work hard, learn, and believe in the future.`,
  wordCount: 343,
  status: "unread"
}, {
  id: "text-a2-003",
  level: "a2",
  levelName: "A2",
  title: "The Adventure on the Wrong Train",
  text: `Last month I had a small adventure that I will never forget. It happened on a Saturday when I wanted to visit my cousin in the next town. The trip was not very long, so I felt confident. I checked the schedule online, put some sandwiches in my bag, and left home early.

At the station, everything looked normal. People were waiting, drinking coffee, and looking at their phones. I bought a ticket and walked to the platform. When the train arrived, I got on quickly because I didn’t want to lose a good seat. I sat near the window and started listening to music. After a few minutes the train moved, and I smiled because I was on time.

But after about twenty minutes, I noticed something strange. The stops were not the ones I remembered. I looked at a big map in the carriage, and my heart jumped. I was on the wrong train! It was going in the opposite direction, away from my cousin’s town. For a moment I felt scared and angry at myself. “How could I make such a stupid mistake?” I thought.

I took off my headphones and asked an old man sitting near me, “Excuse me, is this train going to Greenfield?” He shook his head and said, “No, it goes to Riverside. You need to change at Hill Station.” I thanked him, but I still felt nervous. I had no idea where Hill Station was.

When we arrived at Hill Station, I got off quickly. The station was small and quiet. There was only one café and a few benches. I checked the timetable and saw that the next train to my cousin’s town was in forty minutes. I didn’t want to waste time, so I decided to explore the area. I walked outside and found a little park with tall trees and a small river. The air was fresh, and the water was shining in the sun. I sat on a bench, ate one sandwich, and watched ducks swimming. Slowly I became calm again.

Finally, I returned to the platform. The correct train arrived, and this time I checked the name three times before I got on. When I reached my cousin’s town, she laughed and said, “So your trip was more exciting than you planned!” We spent a great day together.

That adventure taught me an important lesson: always check the train and the direction, even when you feel sure. But it also showed me something nice. A mistake can become a good story, and a new place can surprise you.`,
  wordCount: 405,
  status: "unread"
},

  // Pre-B1 Level (1100+ слов)
  {
    id: "text-preb1-001",
    level: "pre-b1",
    levelName: "Pre-B1",
    title: "The Mystery of the Old House",
    text: `There was an old house at the end of our street that everyone said was haunted. It had been empty for as long as anyone could remember. The windows were broken, the garden was overgrown, and strange noises could sometimes be heard at night.

My friends and I were curious about the house. One Saturday afternoon, we decided to explore it. We climbed over the rusty fence and approached the front door. It creaked loudly when we pushed it open.

Inside, everything was covered in dust and cobwebs. Old furniture stood in the corners, and faded photographs hung on the walls. We walked through the rooms carefully, our hearts beating fast.

Suddenly, we heard footsteps upstairs. We froze in fear. The footsteps grew louder, coming down the stairs. We were about to run when an old man appeared. He looked as surprised as we were!

It turned out he was the owner who had moved away years ago but came back occasionally to check on his childhood home. He wasn't angry at us. Instead, he invited us to sit down and told us stories about the house and his family. The "haunted" house wasn't scary at all – it was just lonely and waiting for someone to remember its stories.`,
    wordCount: 220,
    status: "unread"
  },
  {
    id: "text-preb1-002",
    level: "pre-b1",
    levelName: "Pre-B1",
    title: "A Train That Stopped",
    text: `Last winter, I was traveling by train to visit my grandparents. The trip usually takes two hours, and I expected a calm ride. I brought a sandwich, a book, and my headphones, ready to relax.

At first, everything was normal. People talked quietly, and the train moved smoothly through the snowy fields. Then, after about forty minutes, the train slowed down and stopped in the middle of nowhere. We waited for a few minutes, but nothing happened.

Soon, the conductor walked through the carriage and explained that there was a problem with the track ahead. We could not move until it was fixed. Some passengers became angry, but most people just sighed and tried to stay patient.

A mother with a small child sat near me. The boy looked bored and scared, so I offered him my pencil and paper. We started drawing animals together, and he smiled. A few other passengers joined the game, and the carriage became friendlier.

After an hour, the train finally started again. When we arrived, I was late, but I learned something important: a small kind action can make a difficult moment easier for everyone.`,
    wordCount: 241,
    status: "unread"
  },

  // B1 Level (1400+ слов)
  {
    id: "text-b1-001",
    level: "b1",
    levelName: "B1",
    title: "The Power of Small Actions",
    text: `When I was younger, I believed that making a difference in the world required grand gestures – becoming a famous activist, donating millions to charity, or inventing something revolutionary. It seemed impossible for an ordinary person like me to have any real impact.

That changed when I met Mrs. Chen, an elderly woman who lived in my neighborhood. Every morning, without fail, she would walk around the local park picking up litter. Rain or shine, she was there with her plastic bag and gloves.

One day, I stopped to talk to her. "Why do you do this every day?" I asked. "The park just gets dirty again."

She smiled and said, "I can't clean the whole world, but I can clean this park. And maybe someone will see me and think twice before throwing their trash on the ground. Maybe they'll even join me."

Her words stuck with me. I started helping her on weekends. Soon, other neighbors noticed and began joining us. Within a few months, we had formed a small volunteer group. The park became noticeably cleaner, and people started taking better care of it.

Mrs. Chen taught me that change doesn't always come from above. Sometimes it grows from the ground up, one small action at a time. You don't need to be powerful or wealthy to make a difference. You just need to start somewhere and be consistent. That's a lesson I carry with me to this day.`,
    wordCount: 255,
    status: "unread"
  },
  {
    id: "text-b1-002",
    level: "b1",
    levelName: "B1",
    title: "A Challenge I Didn’t Expect",
    text: `I once signed up for a school competition because my friends did it. I thought it would be fun and easy. The competition was about speaking in English in front of other students, and the best speakers would win a small prize.

When the day came, I felt my hands shake. I suddenly realized I was not ready. While other students practiced confidently, I kept thinking about mistakes I might make. I almost decided to go home.

Then my teacher noticed my fear. She told me something simple: "Speak slowly. Make eye contact. If you forget a word, use another one." That advice helped more than I expected.

When it was my turn, I took a deep breath and started. My voice was quiet at first, but after a few sentences I felt calmer. I did make small mistakes, but I didn’t stop. I finished my speech and heard people clap.

I didn’t win the prize, but I won something better. I learned that courage is not the absence of fear. Courage is speaking even when you are afraid.`,
    wordCount: 215,
    status: "unread"
  },
  // ===== NEW 400-WORD TEXTS =====
  {
    id: "text-b1-003",
    level: "b1",
    levelName: "B1",
    title: "The Lost Wallet",
    text: `On a busy Friday afternoon, I was walking home from school when I noticed something on the sidewalk near a bus stop. At first, I thought it was a small notebook, but when I picked it up, I realized it was a wallet. It was brown, a little old, and felt heavy in my hand. People were passing by quickly, and nobody seemed to notice it.

I moved to the side so I wouldn’t block anyone and opened the wallet carefully. Inside, there were some banknotes, a few coins, and several cards. I also saw an ID card with a photo of a man who looked about forty. His name was Mr. Harris, and there was an address on the card. For a second, I felt nervous. What if someone thought I had stolen it? I decided I needed to act quickly and calmly.

My first idea was to take the wallet to the police station, but it was quite far away. Then I remembered that the bus stop was next to a small supermarket. I went inside and asked the cashier if they had a lost and found box. She did, but she advised me not to leave money there. She suggested I call the number on one of the cards or take it to the nearest bank.

I found a card with a customer service phone number and explained the situation. The operator asked me to bring the wallet to their local branch, which was only ten minutes away. When I arrived, a security guard met me at the door and guided me to a desk. The bank worker wrote down my name and thanked me. She said they would contact the owner right away.

I walked home feeling lighter, even though I didn’t gain anything. Later that evening, I received a call. It was Mr. Harris. He sounded relieved and said the wallet had important documents inside. He thanked me again and offered a small reward, but I refused. I told him I was simply glad it was back where it belonged. That day reminded me that honesty is not a big speech; it is a small decision made at the right moment.`,
    wordCount: 400,
    status: "unread"
  },
  {
    id: "text-b1-004",
    level: "b1",
    levelName: "B1",
    title: "A Weekend Without Screens",
    text: `Last month, my older sister suggested a strange experiment: one full weekend without screens. No phone, no laptop, no TV, not even “just a quick video.” At first, I laughed. Screens were everywhere in my life. I used my phone as an alarm clock, a music player, a map, and a way to chat with friends. How could I spend two days without it?

On Saturday morning, I woke up later than usual because my phone was turned off. I felt a little lost, like something important was missing. My first habit was to reach for my pocket, but there was nothing to check. My sister made breakfast and put a paper note on the table: “If you’re bored, choose one: walk, cook, clean, read, talk.” It sounded simple, but it also felt uncomfortable.

To escape that feeling, I went for a walk. I noticed small things I usually ignored: the smell of fresh bread from a bakery, the sound of leaves moving in the wind, and a dog that kept trying to catch a falling branch. Without headphones, the street seemed louder, but also more real. When I came back, I helped my mother cook lunch. I learned how to cut vegetables faster and how to make a simple sauce. We talked more than we normally do because nobody was scrolling.

In the afternoon, my boredom returned. I couldn’t message my friends, so I wrote a short letter to my cousin who lives in another city. It felt old-fashioned, but also personal. Then I opened a book that had been on my shelf for months. At first, I read slowly, but after a while I got into the story and forgot about time.

Sunday was easier. I didn’t miss notifications as much. My sister and I played a board game, and my father taught us a card trick he learned when he was young. In the evening, we planned the next week using a paper calendar. It was messy, but it worked.

When I turned my phone on Monday morning, I had many messages. Nothing was urgent. That surprised me. I realized that screens are useful tools, but they also fill every quiet moment. The weekend didn’t change my life completely, but it showed me that silence and attention are not empty. They are space where good things can happen.`,
    wordCount: 400,
    status: "unread"
  }, {
  id: "text-b1-005",
  level: "b1",
  levelName: "B1",
  title: "The Day I Learned to Cook",
  text: `Last Sunday started like a normal day, but it became special for me. My parents had to visit my grandmother, and they asked me to stay at home and watch my little sister, Mia. At first I felt nervous, because I don’t have much experience. Mia is six years old, and she can be very active. My mother prepared snacks and left a note on the table: “Lunch is in the fridge. Just heat it.” It sounded easy, so I said, “No problem.”

For the first hours everything was fine. Mia watched cartoons, I cleaned my room, and we ate cookies. But then Mia asked, “Can we make something warm? I want real food.” I opened the fridge and saw the lunch my mother left. It was soup in a big container. I tried to heat it, but I made a mistake and turned on the wrong button. The soup started to boil too strongly and some of it spilled on the stove. Mia looked worried, and I felt embarrassed.

I turned off the heat and cleaned the mess. Then I decided to make something simple from the beginning. I wanted to prove to myself that I could do it. I remembered a basic pasta recipe. I put water in a pot and waited for it to boil. While it was heating, I cut tomatoes and cucumbers for a salad. Mia wanted to help, so I gave her a small spoon and asked her to mix the salad carefully. She was proud to have a job.

When the water boiled, I added the pasta and stirred it. I also found a small jar of tomato sauce in the cupboard. I heated it slowly and added a little salt and dried herbs. The smell started to fill the kitchen, and Mia smiled. “It smells like a restaurant,” she said. That made me laugh, because it was only pasta, but I felt more confident.

After fifteen minutes, we set the table together. Mia put forks and napkins, and I poured water into glasses. The pasta wasn’t perfect, but it tasted good. We ate and talked about school, friends, and what we would do in summer. For the first time, I felt like I was taking care of someone, not just living in the same house.

Later, my parents came back. I told them about the soup accident and the pasta. My father didn’t get angry. He said, “Mistakes happen. The important thing is you solved the problem.” My mother hugged me and thanked me for helping Mia.

That day taught me two things. First, cooking is not only about food. It is about patience and attention. Second, responsibility is not as scary as it seems. When you try, you can learn more in one afternoon than in many easy days.`,
  wordCount: 525,
  status: "unread"
},
  {
    id: "text-preb2-003",
    level: "pre-b2",
    levelName: "Pre-B2",
    title: "How to Give Feedback Without Hurting People",
    text: `Most people say they want honest feedback, but in real life feedback can feel dangerous. If you are too direct, you may sound rude. If you are too soft, your message may disappear. For years I avoided giving feedback because I didn’t want to create conflict. I stayed silent, then later felt annoyed when the same problems happened again.

I learned a better approach during a group project at school. Our team had a strong idea, but one person, Daniel, often arrived late and missed tasks. At first we complained to each other, which only increased tension. Finally, our teacher suggested a simple method: describe facts, explain impact, and ask for a change.

I tried it. After class I said, “Daniel, you were twenty minutes late twice this week, and we couldn’t finish the slides.” I avoided attacking his personality. Then I added the impact: “When that happens, we have to rush, and the final result is worse.” Finally, I asked for a change: “Can you tell us earlier if you might be late, or choose one task you can definitely finish on time?”

Daniel looked surprised, but he didn’t get angry. He explained that he was taking care of his younger brother in the mornings. We didn’t know that. Together we adjusted the plan. He took tasks he could do at home in the evening, and another teammate handled the morning printing. Our project improved, but more importantly, the atmosphere became calmer.

That experience taught me that feedback works best when it is specific and respectful. It also helps to focus on the future, not the past. Instead of “You always mess up,” it is better to say, “Next time, let’s try this.” And timing matters. Giving feedback in front of others can feel like an attack. A private conversation is often kinder.

There is also one more rule: you should be ready to hear feedback too. If you want others to change, you must show that you can listen and adjust. When people feel safe, they become more open to improvement.

Honesty and kindness are not enemies. Good feedback is not about winning an argument. It is about protecting the relationship while making the work, the habit, or the situation better for everyone involved.`,
    wordCount: 400,
    status: "unread"
  },

  // Pre-B2 Level (1600+ слов)
  {
    id: "text-preb2-001",
    level: "pre-b2",
    levelName: "Pre-B2",
    title: "The Digital Dilemma",
    text: `In an era where smartphones have become extensions of ourselves, a growing number of people are questioning our relationship with technology. The convenience it offers is undeniable – instant communication, unlimited information, endless entertainment at our fingertips. Yet, there's an increasing sense that something valuable is being lost.

Consider how we interact with each other now versus a decade ago. Families sit together at dinner tables, each member absorbed in their own screen. Friends meet for coffee but spend half the time photographing their drinks for social media. We've become so focused on documenting moments that we often forget to actually experience them.

Research suggests that excessive screen time is affecting our mental health, particularly among young people. The constant comparison with carefully curated online personas leads to feelings of inadequacy. The never-ending stream of notifications keeps our minds in a state of perpetual distraction, making it difficult to focus on deep, meaningful work.

However, technology itself isn't the villain of this story. It's a tool, and like any tool, its impact depends on how we use it. The solution isn't to abandon our devices entirely – that's neither practical nor necessary. Instead, we need to develop a more mindful approach to our digital consumption.

Some people have found success with designated "phone-free" times or zones in their homes. Others use apps that track and limit their screen time. The key is finding a balance that allows us to enjoy the benefits of technology while preserving our ability to connect genuinely with others and ourselves.`,
    wordCount: 265,
    status: "unread"
  },
  {
    id: "text-preb2-002",
    level: "pre-b2",
    levelName: "Pre-B2",
    title: "Learning to Say No",
    text: `Many people think being helpful means saying "yes" to every request. For a long time, I believed that too. I wanted others to like me, so I agreed to do extra tasks at school, join projects I didn’t enjoy, and help friends even when I was exhausted.

At first, it felt good to be needed. But soon, I began to feel stressed. I had less time for my homework, my hobbies, and my family. I also noticed that some people stopped asking politely. They simply expected me to agree.

One day, I forgot an important deadline because I was helping someone else. My teacher talked to me after class and asked why I looked so tired. When I explained, she said, "Helping is good, but you must also protect your time. Your 'yes' should mean something."

That evening, I decided to change. The next time someone asked me to do something I couldn’t manage, I said, "I’m sorry, I can’t today." My voice shook, but the world didn’t end. In fact, I felt lighter.

Saying no is not selfish. It is a way to set boundaries and stay healthy, so you can say yes when it really matters.`,
    wordCount: 254,
    status: "unread"
  },
  {
    id: "text-b2-003",
    level: "b2",
    levelName: "B2",
    title: "The Hidden Cost of Convenience",
    text: `Convenience is one of the main promises of modern life. With a few taps on a screen, we can order dinner, buy clothes, and have almost anything delivered to our door. We can save time, avoid stress, and feel in control. Yet the more I watched my own habits, the more I wondered what convenience actually costs—especially when it becomes automatic.

I started noticing small patterns. When I was tired, I ordered food instead of cooking. When the weather was bad, I took a taxi instead of walking. When I needed something minor, like batteries, I clicked “buy now” rather than waiting until I went to a shop. Each decision made sense by itself. But together, they created a lifestyle with fewer skills, fewer real interactions, and a strange kind of dependency.

There are also costs we rarely see. Delivery feels “free” because we pay a small fee, but someone else pays with time and physical effort. A courier may rush through traffic under pressure to meet deadlines. A restaurant worker may handle more orders with the same staff. The system is efficient for the customer, but not always humane for the worker. And the environmental cost is hidden too: extra packaging, more transport, and the energy behind constant online services.

Of course, convenience is not evil. For many people, it is necessary. Parents with small children, elderly people, and those with disabilities often rely on delivery services. Busy workers may not have the time or space to cook every day. The problem begins when convenience stops being a choice and becomes the default.

I tried a simple change: a “pause rule.” Before choosing the easiest option, I paused for ten seconds and asked myself two questions. First: “Is this saving time that I will use well?” Second: “Is there a better option that is only slightly harder?” Sometimes the answer was still convenience, and that was fine. But often, I chose differently. I cooked one more meal per week. I walked short distances. I bought several items in one trip instead of many separate deliveries.

The surprising result was not just saving money. It was recovering a sense of capability. Cooking became less stressful. Walking became a way to think. Shops became places where I exchanged a few words with real people. Convenience can be a gift, but only if we stay awake while using it. Otherwise, it quietly trains us to trade our attention, skills, and community for speed.`,
    wordCount: 400,
    status: "unread"
  },

  // B2 Level (2000+ слов)
  {
    id: "text-b2-001",
    level: "b2",
    levelName: "B2",
    title: "The Art of Effective Communication",
    text: `Effective communication is often cited as one of the most valuable skills in both personal and professional life, yet it remains surprisingly elusive for many people. We assume that because we've been talking since childhood, we must be competent communicators. This assumption couldn't be further from the truth.

True communication goes far beyond the mere exchange of words. It involves understanding not just what is said, but what is meant – reading between the lines, picking up on non-verbal cues, and recognizing the emotional undercurrents of a conversation. Perhaps most importantly, it requires genuine listening, which is considerably more challenging than it sounds.

Most of us, when engaged in conversation, are not truly listening to the other person. Instead, we're waiting for our turn to speak, mentally preparing our response while the other person is still talking. This habit prevents us from fully understanding the speaker's message and often leads to misunderstandings and conflicts.

Active listening, by contrast, involves giving the speaker your complete attention. It means suspending judgment, asking clarifying questions, and reflecting back what you've heard to ensure understanding. This approach not only improves comprehension but also makes the speaker feel valued and respected, which strengthens the relationship.

Another crucial aspect of effective communication is adapting your style to your audience. The way you explain a complex concept to a colleague differs significantly from how you'd explain it to a child or a client. Being able to adjust your vocabulary, tone, and level of detail demonstrates empathy and ensures your message is received as intended.

Finally, effective communicators understand the power of non-verbal communication. Body language, facial expressions, and tone of voice often convey more than words alone. Being aware of these signals – both your own and others' – adds depth to your interactions and helps prevent miscommunication.`,
    wordCount: 305,
    status: "unread"
  },
  {
    id: "text-b2-002",
    level: "b2",
    levelName: "B2",
    title: "Why Habits Matter More Than Motivation",
    text: `Motivation is often treated like a magic force: when we have it, we feel unstoppable, and when we lose it, we blame ourselves for being lazy. But motivation is unreliable. It changes with our mood, our energy, and even the weather. Habits, on the other hand, can keep us moving forward even on difficult days.

A habit is a small action repeated until it becomes automatic. The key is not to rely on willpower, but to design your environment. If you want to read more, keep a book on your desk instead of your phone. If you want to eat healthier, prepare simple meals in advance, so you don’t make decisions when you are hungry.

Another important part is identity. People who succeed often say, "I am a runner" instead of "I want to run." This small change influences choices. You start behaving like the person you believe you are.

Of course, building habits takes time. Many people quit because they expect fast results. But progress is usually quiet. If you improve just a little every day, you can reach a big goal over months.

Motivation can start you, but habits can carry you. When you focus on small consistent actions, you stop waiting for the perfect mood and begin creating real change.`,
    wordCount: 240,
    status: "unread"
  }, {
  id: "text-b2-004",
  level: "b2",
  levelName: "B2",
  title: "A Night Under the Stars",
  text: `Our teacher announced a new theme for the school science club: space. At first, I thought it would be only about planets and difficult words, but the project became much more personal. The goal was simple: we had to plan one evening of sky observation and then write a short report about what we saw and what we learned.

We chose Friday because the forecast promised clear weather. After dinner, I packed a flashlight, a notebook, and a warm scarf. My friend Leo brought binoculars from his grandfather. They were not professional, but they made distant lights look closer and sharper. We met in a small park outside the city where street lamps were weaker and the sky looked darker.

The first surprise was how many stars we could see when we stopped looking at our phones. At home, the sky often seems empty, but here it was full of tiny points. Our teacher showed us how to find the North Star using the Big Dipper. Once we found it, the other constellations started to appear like hidden pictures. Leo tried to spot Orion, and I found three stars in a straight line that looked like a belt. It felt like solving a puzzle that humans have been solving for thousands of years.

Then we talked about distance. Our teacher explained that even the closest stars are so far away that their light needs years to reach Earth. That idea was hard to imagine. It meant that when I looked up, I was also looking into the past. I suddenly understood why people say space can make you feel small, but I didn’t feel sad. I felt calm, as if my everyday problems had become lighter.

Later, we used the binoculars to look at the Moon. We could see shadows and rough areas, not just a flat circle. We also tried to find a bright “star” that was actually a planet. The teacher said it was likely Jupiter, and that it has many moons of its own.

When we finally went home, my hands were cold, but my mind was awake. The theme of space was not only about science. It was also about curiosity and perspective. That night taught me that the universe is huge, but our ability to wonder is powerful too.`,
  wordCount: 401,
  status: "unread"
},

  // Pre-C1 Level (2500+ слов)
  {
    id: "text-prec1-001",
    level: "pre-c1",
    levelName: "Pre-C1",
    title: "The Paradox of Choice",
    text: `In modern consumer societies, we are presented with an unprecedented array of choices in virtually every aspect of our lives. From the hundreds of breakfast cereals lining supermarket shelves to the thousands of potential romantic partners on dating apps, the options seem limitless. Conventional wisdom suggests that more choice leads to greater satisfaction – after all, with more options, we're more likely to find exactly what we want. However, psychological research paints a more nuanced picture.

Psychologist Barry Schwartz, in his influential work "The Paradox of Choice," argues that while some choice is undoubtedly better than none, too much choice can actually be debilitating. When faced with an overwhelming number of options, we often experience decision paralysis – the inability to make any choice at all because the cognitive load of comparing alternatives becomes too great.

Moreover, even when we do manage to make a decision, the abundance of alternatives can diminish our satisfaction with the chosen option. We find ourselves wondering whether we could have done better, imagining the benefits of paths not taken. This phenomenon, known as "counterfactual thinking," can transform what should be a positive experience into a source of regret and anxiety.

The implications of this paradox extend beyond consumer goods to major life decisions. The seemingly infinite possibilities for careers, relationships, and lifestyles can leave people feeling overwhelmed and perpetually dissatisfied, always suspecting that the grass might be greener elsewhere.

Interestingly, Schwartz distinguishes between two types of decision-makers: "maximizers," who always seek the best possible option, and "satisficers," who look for options that meet their criteria and then stop searching. Research consistently shows that satisficers tend to be happier with their decisions, even if their choices are objectively less optimal. This suggests that learning to be content with "good enough" rather than always striving for the best might be key to navigating a world of endless choice.`,
    wordCount: 325,
    status: "unread"
  },
  {
    id: "text-prec1-002",
    level: "pre-c1",
    levelName: "Pre-C1",
    title: "What We Remember and Why",
    text: `Human memory feels like a recording device, but it is closer to a story we retell. Each time we remember an event, we do not simply replay it. We rebuild it from fragments: images, emotions, and meaning. This reconstruction helps us learn, yet it also makes memory vulnerable to distortion.

Psychologists have shown that small suggestions can change what people report. If you ask, "How fast were the cars going when they smashed into each other?" you often get higher speed estimates than if you ask, "How fast were they going when they hit each other?" The word choice changes the story the brain constructs.

This does not mean memory is useless. It is designed for survival, not perfect accuracy. We remember patterns, dangers, and lessons. We also remember what fits our identity. If you see yourself as brave, you may focus on moments when you acted well and forget times you hesitated.

In everyday life, this matters in relationships and conflict. Two people can argue about the same conversation because they truly experienced it differently. Understanding that memory is flexible can make us more patient. Instead of immediately thinking "You are lying," we can consider that the brain is doing what it always does: building meaning from incomplete information.

The practical lesson is simple: keep evidence when accuracy matters, and practice humility when it doesn’t. Our minds are powerful, but they are not perfect cameras.`,
    wordCount: 270,
    status: "unread"
  },

  // C1 Level (3000+ слов)
  {
    id: "text-c1-001",
    level: "c1",
    levelName: "C1",
    title: "The Neuroscience of Creativity",
    text: `Creativity has long been shrouded in mystery, often attributed to divine inspiration, genius, or mere chance. However, advances in neuroscience are beginning to illuminate the brain mechanisms underlying creative thought, revealing it to be less magical but no less remarkable than previously imagined.

Contrary to the popular myth of right-brain creativity, neuroimaging studies have shown that creative thinking involves complex interactions between multiple brain regions across both hemispheres. Particularly important is the default mode network (DMN), a collection of brain areas that becomes active when we're not focused on the external world – during daydreaming, mind-wandering, or introspection. This network appears to be crucial for generating novel ideas and making unexpected connections.

However, creativity isn't simply about generating ideas; it also involves evaluating and refining them. This is where the executive control network comes in, helping us focus attention, suppress irrelevant thoughts, and assess whether our ideas are actually useful. The most creative individuals seem to exhibit enhanced connectivity between these networks, allowing them to fluidly shift between imaginative ideation and critical analysis.

Neurotransmitters also play a significant role. Dopamine, often associated with reward and motivation, influences our willingness to explore new ideas and take creative risks. Meanwhile, reduced activity in the prefrontal cortex – the brain's center for logical reasoning and self-censorship – has been observed during improvisation and other spontaneous creative acts, suggesting that sometimes creativity requires us to temporarily silence our inner critic.

These findings have practical implications for fostering creativity. Engaging in activities that activate the default mode network – such as taking walks, showering, or simply allowing time for unstructured thought – can enhance creative insight. Similarly, creating psychological safety, where people feel comfortable expressing unconventional ideas without fear of judgment, can help reduce the inhibitory effects of the prefrontal cortex.

Perhaps most importantly, neuroscience confirms that creativity is not a fixed trait but a skill that can be cultivated. The brain's plasticity means that regular engagement in creative activities can strengthen the neural pathways associated with creative thinking, making innovation more accessible to everyone, not just a gifted few.`,
    wordCount: 350,
    status: "unread"
  },
  {
    id: "text-c1-002",
    level: "c1",
    levelName: "C1",
    title: "When Confidence Becomes a Trap",
    text: `Confidence is usually praised, and in many cases it helps people act decisively. But confidence can also become a trap, especially when it turns into certainty. The more sure we feel, the less we check our assumptions, and the more we ignore signals that we might be wrong.

This is one reason experts sometimes make surprising mistakes. When you have experience, your brain recognizes patterns quickly. That speed is useful, but it can also push you toward a conclusion before you examine the details. Over time, you may begin to trust your intuition more than your evidence.

The solution is not to become insecure. It is to build a habit of testing your thinking. Strong thinkers ask: "What would change my mind?" They look for counterexamples. They invite criticism, not because they enjoy it, but because it improves accuracy.

In teams, this matters even more. Groups that punish disagreement often end up with poor decisions, because people stay silent to protect relationships. Groups that encourage respectful debate tend to see risks earlier and adapt faster.

Real confidence is not the loud belief that you are always right. It is the quiet ability to learn quickly when you are wrong.`,
    wordCount: 215,
    status: "unread"
  }, {
  id: "text-c1-003",
  level: "c1",
  levelName: "C1",
  title: "Snowy New York, 1970",
  text: `In the winter of 1970, New York could feel like two cities at once. One was loud and restless, powered by taxis, subway noise, and neon signs that refused to sleep. The other appeared when heavy snow arrived and covered the usual chaos with a strange, temporary calm. The streets looked softer, as if the city had been wrapped in cotton, but the cold had a sharp edge that woke you up the moment you stepped outside.

That January, a snowstorm moved in from the Atlantic and turned familiar avenues into narrow corridors of white. Snow piled against parked cars and stairways, and people walked carefully, shoulders raised, trying to protect their faces from the wind. At corner shops, the bell over the door rang constantly as neighbors came in for coffee, bread, and batteries. Everyone talked about the same thing: how long it would last, whether the buses would run, and which streets the plows had reached.

The subway kept moving, but it felt different. Wet boots and melting snow created dark puddles on the platform. Strangers stood closer than usual, not from friendliness, but from necessity. Even so, the storm changed the mood. A man offered his seat to an older woman without looking for praise. Two teenagers laughed as they tried to shake snow from their hair, leaving a trail of drops behind them. For a moment, people remembered that a city is not only buildings; it is also the small decisions made between strangers.

Above ground, Central Park became a separate world. The trees were black lines against the pale sky, and the paths disappeared under fresh snow. Kids pulled sleds and threw snowballs near the open fields, while dog owners watched with tired smiles. On the bridges, tourists took photos, but locals walked with the quiet satisfaction of seeing their routine landscape transformed.

In the evening, the lights of Manhattan reflected on the wet streets, turning slush into a mirror. Outside diners, steam rose from vents and mixed with cigarette smoke. Radios played the news in short, serious sentences: delays, closures, warnings about ice. But inside apartments, the storm created a different kind of time. People listened to the wind against the windows and felt the rare comfort of staying in one place.

Snow in New York never lasts. It melts into gray banks at the curb, and the city returns to its speed. Yet those snowy days in 1970 left an impression: a reminder that even the busiest place can pause, and that the pause can reveal a softer, more human version of the same streets.`,
  wordCount: 450,
  status: "unread"
},

  // C1 Pro Level (3250+ слов)
  {
    id: "text-c1pro-001",
    level: "c1-pro",
    levelName: "C1 Pro",
    title: "The Philosophy of Artificial Intelligence",
    text: `The rapid advancement of artificial intelligence technologies has reignited fundamental philosophical questions about the nature of mind, consciousness, and what it means to be human. As machines become increasingly capable of performing tasks once thought to require human intelligence, we are compelled to examine our assumptions about cognition and identity.

At the heart of this discourse lies the question of whether machines can truly "think" or merely simulate thinking. Alan Turing famously proposed what became known as the Turing Test: if a machine can engage in conversation indistinguishably from a human, it should be considered intelligent. Yet critics argue that this behavioral criterion conflates performance with understanding. John Searle's Chinese Room thought experiment illustrates this distinction: a person following rules to manipulate Chinese symbols can produce coherent responses without understanding Chinese. Similarly, might AI systems process information without genuine comprehension?

This debate connects to the broader "hard problem" of consciousness – explaining how and why physical processes give rise to subjective experience. Current AI systems, regardless of their sophistication, presumably lack phenomenal consciousness; there is "nothing it is like" to be a language model or neural network. However, as these systems grow more complex, determining the presence or absence of machine consciousness becomes increasingly challenging.

The ethical implications are profound. If future AI systems were to possess some form of consciousness or moral status, our treatment of them would require radical reconsideration. Moreover, even current AI raises ethical concerns regarding bias, accountability, and the potential displacement of human workers. These challenges demand not only technical solutions but also philosophical frameworks for navigating the moral landscape of artificial minds.

Perhaps the most unsettling possibility is that AI development will force us to acknowledge that human uniqueness was always more illusory than we supposed. If creativity, reasoning, and perhaps eventually consciousness can be replicated in silicon, we must find new foundations for human value and purpose. Alternatively, the endeavor might reveal aspects of human experience that remain stubbornly irreducible to algorithmic processes, affirming our distinctiveness in unexpected ways.`,
    wordCount: 340,
    status: "unread"
  },
  {
    id: "text-c1pro-002",
    level: "c1-pro",
    levelName: "C1 Pro",
    title: "Responsibility Without a Face",
    text: `Modern systems often make decisions without a single clear decision-maker. When an algorithm recommends content, approves a loan, or selects a job candidate, responsibility becomes hard to locate. This creates a moral and political problem: if harm occurs, who should be held accountable?

One answer is to treat such systems like tools. If a tool causes harm, we look at the people who built it and the people who used it. But algorithmic systems are unusual tools. They learn from data, adapt to new patterns, and sometimes behave in unexpected ways. As a result, designers can claim they did not foresee the outcome, and users can claim they only followed the system’s recommendation.

This is why transparency matters. If a system influences important decisions, people deserve to know the criteria it uses, the limitations it has, and the kinds of errors it tends to make. Transparency alone is not enough, however. A transparent injustice is still an injustice.

The deeper challenge is governance. We need rules that define responsibility across the whole chain: data collection, model training, deployment, and oversight. Otherwise, we risk creating powerful technologies that produce real consequences while allowing every human involved to step back and say, "It wasn’t me."`,
    wordCount: 255,
    status: "unread"
  },{
  id: "text-c1pro-003",
  level: "c1-pro",
  levelName: "C1 Pro",
  title: "Truth, Models, and the Limits of Explanation",
  text: `When people argue about “truth,” they often talk past each other. One person means accuracy: a statement matches reality. Another person means usefulness: an idea helps us predict and control outcomes. A third person means sincerity: someone says what they genuinely believe. These meanings overlap, but they are not identical, and confusing them creates endless debates that feel philosophical yet produce little clarity.

A helpful way to reduce confusion is to treat many of our beliefs as models rather than mirrors. A model is a simplified structure that highlights certain features of the world while ignoring others. A subway map is the classic example. It is “wrong” in a literal sense: distances are distorted and geography is sacrificed. Yet it is “right” for navigation because it preserves the relationships that matter for the task. In the same way, a scientific theory, a historical narrative, or even a personal story about who you are can function as a model. It is not a perfect photograph; it is a tool for understanding.

But once you adopt this view, a deeper question appears: if our best explanations are models, what does it mean to say one is true? There is a tempting answer: the truest model is simply the one that predicts best. However, prediction is not the only goal of explanation. We also want understanding, and understanding has a human dimension. A model can be predictively powerful yet feel opaque. Many modern machine learning systems, for example, can classify images or forecast behavior with impressive accuracy, but they struggle to provide explanations that satisfy our desire for reasons. We want to know not only that something will happen, but why it should happen, and what would have to change for it not to happen.

This leads to the concept of “explanatory virtues.” Philosophers of science often discuss qualities like simplicity, coherence with other accepted claims, scope, and fruitfulness. A simple model is easier to use, but it might miss important details. A coherent model fits nicely with what we already believe, but it might be biased by tradition. A model with wide scope can unify many phenomena, but it might become so abstract that it loses contact with concrete cases. In practice, explanation is an optimization problem with multiple objectives, and different communities assign different weights.

The problem becomes sharper when explanation is not just academic but moral and political. Consider the explanations we give for poverty, crime, or addiction. A model that emphasizes individual choices can support policies focused on responsibility and punishment. A model that emphasizes structural conditions can support policies focused on support and reform. Both models may capture real patterns, and both can be abused. If you insist that only one layer is “true,” you might end up protecting your favorite narrative rather than learning from reality.

So how should we talk about truth without collapsing into “anything goes”? One approach is pragmatic but disciplined: treat truth claims as commitments that must survive contact with evidence, counterexamples, and competing explanations. A model earns trust by performing well under pressure: it predicts new cases, it remains stable when tested, it integrates with other reliable models, and it can be used to intervene effectively. At the same time, we keep a place for humility. No finite model can capture an infinite world, and a model that works today may fail tomorrow when the environment changes.

In this sense, the pursuit of truth is less like collecting final answers and more like maintaining a living system of explanations. We build models, test them, revise them, and sometimes replace them. The goal is not perfect certainty but progressively better maps. And the most dangerous error is not being wrong; it is being so certain that you stop updating.`,
  wordCount: 520,
  status: "unread"
},
{
  id: "text-c1pro-004",
  level: "c1-pro",
  levelName: "C1 Pro",
  title: "Autonomy in the Age of Persuasion",
  text: `Autonomy is often described as the freedom to choose. In everyday language, this sounds simple: you are autonomous when nobody forces you. Yet in modern societies, influence rarely arrives as a direct order. It arrives as design. The choices are still technically yours, but the environment is engineered to make some choices feel natural, effortless, or even inevitable. If autonomy is only defined as the absence of coercion, it becomes too weak to describe what is happening to decision-making today.

To see why, consider how persuasion operates when it is built into systems. A supermarket places essentials like milk at the back so you pass tempting items on the way. A streaming service auto-plays the next episode, turning a decision into inertia. A social platform delivers unpredictable rewards—likes, comments, sudden bursts of attention—that train the brain to check again. None of these mechanisms remove your ability to say no, but they change the default path of your behavior. They convert active choice into passive continuation.

Philosophers sometimes distinguish between first-order desires and second-order desires. A first-order desire is what you want in the moment: another cookie, another episode, another scroll. A second-order desire is what you want to want: to be healthy, to sleep well, to be present with friends, to do meaningful work. Autonomy, on this view, is not merely doing what you desire; it is aligning your actions with the desires you endorse upon reflection. The conflict many people feel is not between freedom and constraint, but between two versions of themselves—one that reacts and one that reflects.

This is where modern persuasion becomes ethically interesting. Systems optimized for engagement are often excellent at targeting first-order desires, especially when those desires are tied to boredom, anxiety, or loneliness. The less stable you feel, the more predictable your coping strategies become, and the easier it is for a system to keep your attention. Again, no one is “forcing” you, but influence can still be exploitative if it systematically pulls you away from your second-order goals.

The usual response is individual discipline: “Just use your willpower.” But willpower is a limited resource, and treating autonomy as a personal moral achievement ignores how environments shape behavior. A more realistic view treats autonomy as a capability that can be supported or undermined by design. Good design reduces the need for constant self-control. It makes beneficial actions easier and harmful actions harder, not by removing choice, but by structuring it in a way that respects reflective preferences.

What would that look like? It could mean default settings that protect attention: notifications off by default, friction for endless feeds, clear stopping points, honest metrics about time spent. It could mean transparent persuasion: labeling sponsored content, explaining why something is recommended, and giving users control over the criteria. It could mean institutional rules that limit manipulative practices, similar to how food and drug regulations limit harmful ingredients even when consumers could theoretically choose otherwise.

None of this guarantees perfect autonomy, because autonomy is not a permanent state. It fluctuates with fatigue, stress, and social pressure. The more honest claim is that autonomy is something we cultivate. We cultivate it by building habits that create distance between impulse and action, by choosing communities that reinforce our long-term goals, and by supporting policies that prevent powerful systems from treating human attention as a resource to be mined.

In the age of persuasion, freedom is not only the right to choose. It is the ability to choose on purpose.`,
  wordCount: 531,
  status: "unread"
},

  // Pre-C2 Level (3500+ слов)
  {
    id: "text-prec2-001",
    level: "pre-c2",
    levelName: "Pre-C2",
    title: "The Anthropocene and Planetary Boundaries",
    text: `The concept of the Anthropocene—a proposed geological epoch defined by humanity's significant impact on Earth's systems—has transcended its origins in geology to become a framework for understanding our contemporary predicament. It encapsulates the uncomfortable truth that human activities have become a force of nature, reshaping the planet in ways that will persist for millennia.

Central to this discourse is the notion of planetary boundaries, introduced by Johan Rockström and colleagues in 2009. This framework identifies nine Earth system processes that regulate the stability and resilience of the planet: climate change, biodiversity loss, biogeochemical flows (nitrogen and phosphorus cycles), ocean acidification, land-system change, freshwater use, stratospheric ozone depletion, atmospheric aerosol loading, and the introduction of novel entities (including chemicals and plastics). For each process, the framework proposes thresholds that, if transgressed, could trigger abrupt or irreversible environmental changes.

Disturbingly, evidence suggests that we have already exceeded safe limits for at least four of these boundaries: climate change, biodiversity loss, land-system change, and biogeochemical flows. The consequences are increasingly visible in extreme weather events, mass extinctions, degraded soils, and polluted waterways. What makes this particularly concerning is the interconnected nature of these boundaries; transgressing one often exacerbates others, potentially triggering cascading effects that could fundamentally alter Earth's habitability.

Addressing these challenges requires more than technological innovation; it demands a fundamental reconsideration of our relationship with the natural world. The dominant economic paradigm, predicated on perpetual growth and the externalization of environmental costs, is fundamentally incompatible with planetary boundaries. Alternative frameworks—such as Kate Raworth's "doughnut economics," which envisions a safe and just space between social foundations and ecological ceilings—offer promising conceptual tools.

Yet translating these frameworks into action confronts formidable obstacles: entrenched economic interests, geopolitical fragmentation, cognitive biases that discount future risks, and the sheer complexity of Earth systems. The Anthropocene thus poses not merely an environmental challenge but an existential test of humanity's capacity for collective action and intergenerational responsibility.`,
    wordCount: 335,
    status: "unread"
  },
  {
    id: "text-prec2-002",
    level: "pre-c2",
    levelName: "Pre-C2",
    title: "What We Measure Shapes What We Value",
    text: `In policy, business, and education, measurement is often treated as neutral: we assume numbers simply describe reality. Yet measurement also shapes reality, because what we choose to count becomes what we choose to prioritize. The moment a target is set, behavior changes to meet it, sometimes in ways that undermine the original goal.

This is visible in schools that focus narrowly on standardized test scores. Teachers may feel pressure to "teach to the test," reducing time for curiosity, creativity, and deep understanding. In business, performance metrics can motivate improvement, but they can also encourage short-term thinking. If profit is the only goal, long-term resilience, worker well-being, and environmental cost become easy to ignore.

The deeper issue is that many important values are difficult to quantify. Trust, dignity, meaning, and community rarely fit neatly into dashboards. When they are left unmeasured, they may be treated as less real. This creates a bias toward what is easily counted, even when it is not the most important.

A healthier approach is to treat metrics as tools, not truth. Good systems combine measurement with judgment. They ask not only "Did we hit the number?" but also "Did we improve what the number was supposed to represent?" When we remember that measurement is a choice, we can choose more wisely—and build institutions that serve people rather than spreadsheets.`,
    wordCount: 280,
    status: "unread"
  },{
  id: "text-prec2-003",
  level: "pre-c2",
  levelName: "Pre-C2",
  title: "Napoleon: Ambition, Reform, and the Price of Empire",
  text: `Napoleon Bonaparte remains one of the most debated figures in European history because he is difficult to place into a single moral category. To some, he was a military genius who defended revolutionary France and modernized the state. To others, he was an authoritarian ruler who replaced one form of absolutism with another, waged destructive wars across the continent, and treated human lives as fuel for an imperial project. The truth is not a compromise between these views so much as a recognition that both are true at once, depending on what aspect of his legacy we examine.

Born in Corsica in 1769, Napoleon rose rapidly through the ranks during the French Revolution, a period that disrupted traditional hierarchies and rewarded competence, ambition, and political flexibility. His early success in Italy made him famous, and his 1798 campaign in Egypt, although militarily mixed, contributed to a myth of grandeur and destiny. By 1799 he had taken power in the coup of 18 Brumaire, becoming First Consul and later, in 1804, Emperor. This trajectory is often interpreted as the revolution betraying itself, but it can also be seen as a response to instability: after years of chaos, many French citizens wanted order, and Napoleon offered it.

His domestic reforms are central to understanding why he retained support. The Napoleonic Code, introduced in the early 1800s, standardized French civil law and strengthened principles such as equality before the law and the protection of property. At the same time, it reinforced patriarchal authority in the family and limited women’s legal rights, revealing the boundaries of revolutionary universalism in practice. Napoleon also reorganized administration through a system of prefects, strengthened state finances, supported infrastructure, and created institutions that rewarded merit, such as the lycée system and the Legion of Honor. These changes helped build a modern centralized state, and versions of them influenced legal and administrative systems beyond France.

Yet Napoleon’s state-building cannot be separated from war. From 1803 onward, Europe entered a cycle of conflict that reshaped borders and political identities. Napoleon defeated major powers in a series of brilliant campaigns, and for a time he seemed unstoppable. His victories allowed him to impose new political arrangements, including satellite kingdoms ruled by relatives or loyal allies. In some regions, French influence weakened old feudal structures and spread reform. In others, it provoked nationalist resistance and resentment, especially when French rule meant conscription, taxation, and the extraction of resources.

The Continental System, designed to weaken Britain by restricting European trade with it, illustrates how Napoleon’s strategic thinking could become economically and politically self-defeating. Enforcement created hardship and encouraged smuggling, while the attempt to control the European economy increased tensions with allies and neutral states. The 1812 invasion of Russia, often treated as the turning point of his career, exposed the limits of military power when geography, climate, logistics, and political will align against an army. The disastrous retreat destroyed much of the Grande Armée and emboldened a coalition of enemies.

After defeats in 1813 and his first abdication in 1814, Napoleon returned dramatically during the Hundred Days in 1815, only to be defeated at Waterloo. Exiled to Saint Helena, he spent his final years shaping his own legend, presenting himself as a heroic figure betrayed by fate and by hostile monarchies. This self-mythologizing mattered: Napoleon understood that history is not only events but narratives, and his story became a template for later political ambition.

Napoleon’s legacy, then, is a paradox of modernization through domination. He helped create durable legal and administrative frameworks, but he also normalized the idea that reform could be delivered by force and consolidated by personal rule. Remembering Napoleon responsibly means resisting both worship and dismissal. He was neither purely a liberator nor merely a tyrant. He was a builder of institutions and a maker of wars, and Europe lived with the consequences of both.`,
  wordCount: 607,
  status: "unread"
},

  // C2 Level (3800+ слов)
  {
    id: "text-c2-001",
    level: "c2",
    levelName: "C2",
    title: "Epistemological Challenges in the Post-Truth Era",
    text: `The designation of "post-truth" as the Oxford English Dictionary's Word of the Year in 2016 crystallized growing anxieties about the epistemological foundations of democratic society. The term describes circumstances in which objective facts are less influential in shaping public opinion than appeals to emotion and personal belief—a characterization that resonates with phenomena ranging from climate change denial to the proliferation of conspiracy theories.

However, the notion of a "post-truth era" warrants careful scrutiny. It implicitly presupposes a prior era when truth was appropriately valued—a golden age of rational discourse that historical analysis struggles to substantiate. Political manipulation, propaganda, and the selective deployment of facts are hardly novel phenomena. What has changed, perhaps, is not human susceptibility to misinformation but rather the technological and institutional landscape in which information circulates.

Digital platforms have democratized content production while simultaneously concentrating control over distribution in the hands of algorithms optimized for engagement rather than accuracy. The resulting information ecosystem rewards sensationalism and outrage, creating fertile ground for the viral spread of false or misleading content. Meanwhile, traditional gatekeepers of knowledge—journalists, academics, experts—have seen their authority eroded by accusations of elite bias and by their own occasional failures of objectivity.

Yet the epistemological challenges run deeper than technology and institutions. Postmodern philosophy, with its emphasis on the social construction of knowledge and the perspectival nature of truth, has permeated popular consciousness, often in vulgarized forms that conflate the legitimate insight that knowledge is shaped by context with the nihilistic conclusion that all claims are equally valid. This philosophical relativism provides intellectual cover for dismissing inconvenient facts as merely one perspective among many.

Navigating these challenges requires neither a naive return to positivist faith in unmediated access to truth nor a descent into epistemic anarchism. Rather, it demands the cultivation of what might be termed "critical epistemic humility"—an approach that acknowledges the limits and situatedness of knowledge while maintaining that some claims are better supported by evidence and reasoning than others, and that this distinction matters for both individual and collective flourishing.`,
    wordCount: 345,
    status: "unread"
  },
  {
    id: "text-c2-002",
    level: "c2",
    levelName: "C2",
    title: "Attention as a Political Resource",
    text: `Power is often described in terms of money, laws, and violence. But in contemporary societies, attention has become a political resource of its own. Whoever controls what people notice can influence what they fear, what they desire, and what they consider normal.

Digital platforms operate in an economy of attention. They do not merely deliver information; they compete for time. As a result, content is optimized for engagement, not for understanding. This shapes public life: outrage travels faster than nuance, and simple narratives defeat complex explanations.

The political risk is not only misinformation, but fragmentation. When groups inhabit different information environments, they do not merely disagree; they struggle to share a common reality. Without a shared base of facts, democratic negotiation becomes harder, because compromise requires at least minimal agreement about what is happening.

None of this implies that citizens are helpless. Attention can be trained and protected. Individuals can reduce algorithmic influence by choosing slower media, reading full articles rather than headlines, and building habits of verification. Institutions can support this by funding public-interest journalism and increasing transparency around recommendation systems.

In a world where attention is constantly extracted, choosing where to place it becomes an ethical act. It is also a civic skill—one that may determine whether our public conversations remain possible at all.`,
    wordCount: 275,
    status: "unread"
  },
  {
    id: "text-c2pro-002",
    level: "c2-pro",
    levelName: "C2 Pro",
    title: "Identity Over Time and the Problem of Change",
    text: `A persistent puzzle in philosophy concerns personal identity: what makes you the same person across time, even as your body, beliefs, and memories change? On one intuitive view, identity is anchored in something stable—a soul, an essence, or a continuous subject of experience. On another view, identity is a practical construction: a narrative that connects different stages of a life into a coherent story.

Psychological continuity theories emphasize memory, character, and intention. If you can remember key events, recognize your values, and pursue long-term plans, you count as the same person. But this raises difficult cases. Memory can be unreliable or lost. People can undergo radical personality change through trauma, illness, or deliberate transformation. At what point does continuity weaken so much that identity becomes unclear?

Narrative approaches suggest that identity is less like a single object and more like an ongoing project. You interpret your past and project your future, constantly editing what your life "means." This explains why people can feel disconnected from their younger selves, yet still claim responsibility for what they did. The self, on this view, is not discovered but maintained.

The moral implications are significant. If identity is partly constructed, then personal growth involves more than changing habits; it involves reshaping the story you tell about yourself. Yet it also means that blame and praise must be handled carefully. We hold people responsible because we assume a connection between who they were and who they are now, but that connection can vary in strength.

The problem does not end with a clean answer. Instead, it reveals a tension between metaphysics and practice: we need identity to make sense of love, promise, and justice, even if the underlying reality is messier than our language suggests.`,
    wordCount: 315,
    status: "unread"
  },{
  id: "text-c2pro-003",
  level: "c2-pro",
  levelName: "C2 Pro",
  title: "A Paris Itinerary as a Philosophy of Attention",
  text: `To travel to Paris is to enter a city that has been pre-interpreted. Long before you arrive, Paris has already arrived in you: a montage of films, paintings, and postcards; the Eiffel Tower glittering on the hour; café chairs angled toward the street as if the real attraction is not the menu but the flow of life itself. The risk, then, is not that Paris will disappoint, but that you will meet only the Paris you expected to see. The most rewarding journeys here begin with a different ambition: not to “do” the city, but to learn how to pay attention inside it.

I arrived on a gray morning when the sky looked like brushed metal. The métro from the station carried me beneath the city’s elegance into its practical underlayer: tiled corridors, the smell of brakes and electricity, advertisements repeating in glossy confidence. Paris above ground has a reputation for beauty; Paris below ground is where you see how a beautiful city moves. On the platform, people stood with the particular stillness of commuters who have mastered the art of waiting without appearing to wait. When the train arrived, it was not romantic. It was ordinary—exactly the point. A city is not its monuments. A city is its habits.

My first walk was deliberately unplanned. I chose a direction and promised myself I would not correct my path with a phone map unless I became truly lost. This small constraint changed the texture of the day. Without constant orientation, the mind begins to register details it normally discards: the geometry of balconies, the way shutters are painted in slightly different whites, the thin trees planted along the boulevard like punctuation marks. I crossed a bridge and realized I had reached the Seine. The river did not feel like a tourist object. It felt like an organizing principle, a moving line that turns the city into two pages of the same book.

In Paris, the temptation is to chase icons. The icons are real, and I do not want to be falsely superior about them. The Eiffel Tower is not “overrated”; it is simply over-familiar. When I finally saw it, rising behind apartment blocks, it produced a curious double sensation: recognition and surprise at once, like meeting someone you have known only through stories. I went up not because I needed the view for proof, but because height rearranges meaning. From above, Paris becomes a pattern—streets as lines, parks as dark pools, domes like rounded thoughts. The city is legible from a distance, yet the lesson of the view is humility: even the most “complete” panorama cannot tell you how a corner bakery smells at 8 a.m.

That bakery became my real landmark. Each morning I returned to it, not out of loyalty to a brand but to the simple idea of repetition. Travel is usually framed as collecting novelty, yet the mind needs stable points to notice change. At the counter, my French was clumsy but functional. I learned that politeness in Paris has a form: a greeting is not optional, and skipping it can feel like a small insult. “Bonjour” was less a word than a key that unlocked a slightly warmer world. With time, even my mistakes became useful. They slowed the interaction and made me listen harder.

One afternoon I decided to treat the Louvre not as an obligation but as a problem in perception. The museum is too large to “see,” and pretending otherwise turns art into a checklist. I chose a small route: a few rooms, slowly. The famous paintings were surrounded by phones held up like shields, as if people feared direct contact with the thing they came for. This is not a critique of technology so much as a description of anxiety: the anxiety of missing out, of leaving without evidence, of not having the correct experience. I stood behind the crowd, then stepped sideways to look at the same painting from an angle where the surface caught the light differently. The painting changed. Not the image, but the fact of paint—its thickness, its decisions. It reminded me that art is not primarily an object; it is an event that occurs between attention and material.

In the evening I walked through the Marais, where the city feels layered rather than unified. In one street you pass a centuries-old façade, a minimalist boutique, and a falafel shop with a queue that suggests a local consensus. Paris has a reputation for being obsessed with tradition, but the real tradition is reinvention. The city has been remodeled so many times—politically, architecturally, culturally—that what looks permanent is often the result of repeated edits. Even the “classic” Paris of wide boulevards is, historically speaking, an intervention. Seeing this makes the city less like a museum and more like a living argument about what public space should be.

Public space in Paris teaches another lesson: how to sit. In many places, sitting is treated as loitering unless you are paying. In Paris, sitting—on a bench, at the edge of a fountain, at a café table with a single espresso—seems socially legitimate. It is a way of participating without producing anything. I spent an hour at the Jardin du Luxembourg watching small dramas: children pushing toy sailboats, couples negotiating silence, runners passing with disciplined breathing. Nothing “happened,” and yet my memory of that hour felt fuller than some of the days when I rushed from site to site. The value was not in spectacle but in the permission to exist slowly.

Of course, I did the classic walk: from Notre-Dame’s island outward along the Seine. The cathedral itself, still marked by the afterlife of fire and reconstruction, made time visible. Scaffolding is a form of honesty. It admits that beauty requires maintenance, that continuity is labor. I thought about how cities narrate themselves through restoration: what they choose to rebuild exactly, what they modernize quietly, what they let disappear. Paris is often portrayed as untouched, but its “unchanged” look is the result of continuous work, regulation, and taste enforced over generations.

Food in Paris can become a performance, but it is also a way the city teaches you scale. A good meal here is not always extravagant; it is often precise. I had a simple dinner in a small bistro where the server did not smile constantly and yet was attentive in a more serious way. The salad tasted of actual leaves rather than decoration. The bread was not an accessory; it was part of the logic of the meal. There is a cultural confidence in doing a few things well and not apologizing for the lack of endless options. Compared to cities that equate hospitality with enthusiastic friendliness, Paris can feel reserved. But once you stop demanding a certain emotional style, the reservation reads differently: it is a boundary that protects both parties from forced intimacy.

One day I took the métro to Montmartre early, before the steep streets filled with cameras. The hill was quiet enough to hear my footsteps. Near Sacré-Cœur, Paris looked almost theatrical, as if the city had built a viewing platform for its own legend. Yet the most striking moments were not the basilica or the panorama. They were the small workshops opening their shutters, the delivery vans navigating narrow lanes, the woman sweeping her doorstep in a gesture older than any tourist economy. It is easy to romanticize these scenes, to treat them as “authentic.” But authenticity is not a property of people. It is a relationship between observer and observed. If I look at someone’s routine as if it were staged for me, the problem is my gaze, not their life.

Travel also exposes language as a moral practice. When you cannot speak fluently, you are forced into humility. You ask for help. You accept correction. You become aware that meaning is not only vocabulary but tone, pacing, and context. In a pharmacy, I struggled to describe what I needed. The pharmacist asked clarifying questions with patient efficiency, and we found a solution. This small exchange did not feel like a transaction; it felt like a demonstration that cities run on micro-cooperation. The myth of the rude Parisian is often a misunderstanding of social codes and the fatigue of being treated as a service character in someone else’s vacation.

Midway through the trip, I set myself a different kind of itinerary: museums of ordinary life. I went to a market in the morning and watched how people chose fruit, pressing gently as if reading with fingertips. I visited a neighborhood far from the center where the buildings were less ornamental and the street art more direct. I took a bus instead of the métro just to see the city stitch itself together above ground. I noticed that Paris is not one city but many, and the central postcard version is only one of its dialects.

At night, I returned to the Seine. The river changes character after dark. The water takes the light and breaks it into moving pieces. The bridges become stages for small performances: musicians, conversations, laughter that travels farther in the cold air. I sat on the stone edge and felt an unfamiliar calm. Not the calm of finishing tasks, but the calm of being temporarily anonymous. In your own city, you carry a history everywhere: who you are to others, what you have promised, what you have failed to do. In a foreign city, you can sometimes step outside that story. The danger is to treat this as escape rather than perspective. But if used well, it becomes a way to return home with a slightly wider self.

On my last day, I finally allowed myself the most “Parisian” cliché: I bought a small notebook and wrote in a café for an hour. The café was not magical. The chair was slightly uncomfortable. The coffee was good, not life-changing. The magic, if there was any, came from the simple structure of attention: a public place where you can be alone without being isolated. Around me, conversations formed and dissolved. A waiter moved with the practiced rhythm of someone who has learned how to occupy space without colliding with anyone’s mood. I wrote about what I had learned, and the lesson was not about Paris at all.

Paris, in the end, taught me that travel is a discipline of interpretation. You can treat a city as a product to consume—sights, meals, photos, stories to display. Or you can treat it as an encounter that changes how you perceive your own life. The second approach is slower and less efficient, which is precisely why it works. It refuses the logic of maximizing experiences and instead asks for depth: fewer places, more presence. The Eiffel Tower will still be there in the background of your memory, glittering as expected. But what will surprise you, if you let it, is the quiet intelligence of ordinary moments: the ritual of “bonjour,” the patience of a pharmacist, the river’s dark reflections, the feeling of sitting with no urgency. Those are not souvenirs you can buy. They are skills you can bring home.`,
  wordCount: 1409,
  status: "unread"
},{
  id: "text-c2pro-004",
  level: "c2-pro",
  levelName: "C2 Pro",
  title: "The American Ace: A WWII Pilot, a Hero, and the Weight of the Sky",
  text: `In the mythology of the Second World War, the fighter pilot often appears as a clean symbol: a solitary figure in a fast machine, courage distilled into a single silhouette against the clouds. That image is not exactly false, but it is incomplete. Behind every “ace” and every headline about a downed enemy aircraft stood a web of mechanics, controllers, weather officers, intelligence analysts, and friends whose names rarely made it into the story. And behind every celebration stood a private arithmetic of risk: hours flown, mistakes avoided, and the knowledge that luck—an invisible crewmate—could resign at any moment.

This is a story about an American pilot who became a hero in the European theater. He is not meant as a replacement for any one historical figure, but as a composite of many lives: young men who left small towns and big cities, learned to trust metal and training, and then discovered that the sky could be both a refuge and a trap. To tell his story honestly is not to flatten war into inspiration, but to describe how heroism is often made from discipline, fear managed correctly, and a stubborn refusal to abandon others.

He grew up in the late 1920s in a place where the horizon looked wide enough to promise escape. His father worked long hours and spoke little about feelings. His mother kept the household running through the Depression with a talent for making scarcity look temporary. The boy’s first obsession was not war but speed. He followed newspaper accounts of record-breaking flights, and he saved scraps of money to buy aviation magazines that smelled faintly of ink and fuel. When a traveling air show came to the county fairgrounds, he watched a biplane climb with the slow confidence of something that should not be able to rise, and he felt the first true ache of ambition: not to watch the sky, but to enter it.

After Pearl Harbor, the country’s mood changed with remarkable speed. The moral clarity that people later associate with that period was not always present in the first days, but momentum arrived quickly, and for many young Americans the question became less “should I go” than “where can I be useful?” He enlisted before he fully understood what enlistment meant. In training, he learned that the romantic image of flying is built on repetition. Checklists were not bureaucracy; they were survival. Instructors drilled procedures until they became reflex, because panic is less dangerous when it has fewer decisions to make.

He earned his wings and was assigned to a fighter group flying escort missions—long flights designed to protect bombers as they crossed into hostile airspace. Escort duty did not sound glamorous to outsiders, but to crews it was the difference between arriving and not arriving. Bombers were heavy and vulnerable. Fighters were meant to be agile guardians, quick to intercept, quick to reposition, quick to sacrifice perfect formation for the urgent task of keeping enemy planes away from the slow-moving boxes of men and metal.

The first time he flew over the Channel, he felt a peculiar disappointment: the war did not look like war. The sea was calm. The clouds were ordinary. The radio chatter was professional, almost boring. Then, at a distance that looked like a smudge, he saw flak bursting black and white—small, ugly flowers blooming in the sky. The sound came later, a delayed thump carried through the aircraft’s frame. He understood then that modern battle was not always visible. Sometimes it was statistical: a region of air where the odds became worse.

His first engagement happened without drama. A call came over the radio. The formation tightened. He saw enemy fighters approach as flickers of movement at the edge of vision. Training took over: identify, commit, fire only when you have the angle, don’t chase too far, don’t get separated. He did not feel like a hero. He felt like a student taking an exam while the classroom burned. When the fight ended, he realized his hands were shaking and his mouth was dry, and he could not remember certain seconds clearly, as if the brain had edited the tape.

Over time, he became something that pilots quietly admired: dependable. Not reckless, not theatrical, but steady. He was the kind of wingman you wanted on your right side, the kind of flight leader who noticed a new pilot’s mistakes and corrected them without humiliation. This is rarely the center of heroic narratives, but it is the core of real operational success. His squadron began to trust him with more responsibility: leading sections, then flights, then taking the difficult position of staying with damaged aircraft rather than pursuing a cleaner kill.

The moment that made him famous—at least within the small universe of his group—came on a cold morning when the sky looked deceptively clear. The bombers were returning from a deep mission, and enemy fighters attacked late, when fuel was low and attention thin. In the chaos, one of the bombers took heavy damage. It fell behind the formation, drifting into the most dangerous space: alone. A bomber that lags is a promise to the enemy. The radio filled with fragmented calls, each voice trying to sound calm while calculating the same unpleasant truth.

He broke formation to escort the crippled aircraft. This was not a heroic flourish. It was a decision with a measurable cost: leaving the main group increased his own risk and reduced protection for others. But the bomber was losing altitude, and its gunners were running out of ammunition. Enemy fighters circled like impatient birds. He positioned his fighter between the attackers and the bomber’s tail and began to fly a defensive pattern, forcing the enemy into less favorable angles.

In the minutes that followed, he downed two attackers and damaged a third, not through mystical skill but through attention: patience, timing, and the willingness to wait for a shot that felt certain. He spent ammunition conservatively. He used altitude like currency. He called for help, but help was far. The bomber kept limping west, a wounded animal refusing to lie down. By the time friendly fighters arrived, the bomber was still airborne. Later, when it landed, crews found holes scattered across its fuselage and a section of control cable that looked as if it had survived by insult rather than engineering.

Stories like this get simplified. In the retelling, he “saved the bomber” and “fought off the enemy” and “returned home triumphant.” But the more honest version includes the less cinematic parts: the cold sweat, the misgivings, the calculation of fuel, the fear that he might escort the bomber all the way down into a field and be captured. Heroism in air combat is not the absence of fear; it is fear turned into a schedule of tasks.

When the war machine noticed what happened, it did what machines do: it converted the event into a narrative. A commendation followed. A photograph. A short write-up that used words like “gallantry” and “indomitable.” He accepted the medal because refusing it would have been interpreted as a statement, and he did not want to become a symbol. He wanted to remain a pilot with work to do. Yet recognition came with consequences. New pilots watched him as if he carried a secret. Officers offered him safer assignments. He felt a kind of guilt that surprised him: guilt not for what he had done, but for being visible while others remained invisible.

The psychological toll of repeated missions rarely appears in glossy stories. Pilots lived in a loop of anticipation and aftermath. Before a flight there was tension, disguised as joking. After a flight there was a temporary euphoria that often collapsed into silence. Loss was constant and sometimes random. A friend could survive ten missions and die on the eleventh because of weather, a mechanical failure, a stray burst of flak. The mind tries to create meaning from patterns, but war does not always cooperate.

He developed private rituals. He checked his gear twice, not because he forgot, but because repetition gave him a sense of control. He wrote short notes to his mother that avoided specifics. “I’m fine,” he would say, because the truth was complicated and because censorship would remove the complicated parts anyway. He formed a friendship with a mechanic who could diagnose an engine by sound. They spoke after missions, one talking about the sky, the other about metal, both pretending they were discussing technical issues rather than mortality.

Near the end of his tour, he was shot down. Not in a blaze of glory, but in a brief, brutal exchange. His plane took a hit, the engine lost power, and he had seconds to decide between trying to limp home or bailing out over enemy territory. He chose the parachute. The descent was quiet in a way that felt obscene. He landed hard, hid his parachute, and ran until his lungs burned. He was captured within hours.

Captivity is its own kind of warfare: slow, psychological, designed to reduce a person to time and waiting. He survived because he treated each day as a small mission: maintain routines, protect information, help others where possible. He learned that heroism can be passive: the refusal to despair, the ability to keep someone else from giving up. When the war ended, he returned thinner, older in the eyes, and strangely uncomfortable with applause.

After the war, people wanted a tidy ending. They wanted him to become a commercial pilot, or a politician, or a symbol of national confidence. Instead, he struggled. He had nightmares, not always of combat, but of the moment before combat: the instant when the radio crackled and the body prepared itself to become an instrument. He found ordinary life loud. He disliked fireworks. He avoided air shows.

And yet, over years, he built a quieter legacy. He studied under the GI Bill. He spoke to students about discipline rather than glory. He attended reunions where men laughed too loudly and then grew silent when certain names were mentioned. He volunteered at a local air museum, not because he loved nostalgia, but because he wanted to anchor memory to something real rather than mythic. When young people asked what it felt like to be a hero, he would pause and say something inconvenient: “Most of the time, it felt like doing my job while hoping my friends would come back.”

To call such a man a hero is not wrong, but it can be too easy. The word “hero” can become a smooth stone that covers sharp edges: the politics of war, the civilian cost, the moral injuries that survive victory. A more demanding respect recognizes two truths at once. First, that his actions saved lives in moments where seconds mattered. Second, that the war that required those actions was a catastrophe, and no individual bravery can redeem the fact of mass death.

If his story has a lesson, it is not a lesson about seeking danger. It is a lesson about responsibility under pressure. In the air, he learned that skill is a form of care: you practice not for personal pride, but because your mistakes become someone else’s funerals. He learned that leadership is mostly attention—seeing who is struggling, who is overconfident, who needs to be pulled back from a reckless chase. He learned that courage is often quiet, and that survival is never purely deserved.

America celebrates heroes because it needs narratives that make sacrifice intelligible. But the best way to honor a WWII pilot is not to polish him into a statue. It is to keep the complexity intact: the fear and the discipline, the luck and the loss, the duty and the damage. In that complexity, you find not only inspiration, but a warning about the cost of turning young lives into instruments of history.`,
  wordCount: 1270,
  status: "unread"
}, {
  id: "text-c2pro-005",
  level: "c2-pro",
  levelName: "C2 Pro",
  title: "USSR: A State That Tried to Engineer History",
  text: `To speak about the USSR is to enter a terrain where ordinary categories struggle. It was at once a political experiment, a multiethnic empire, an industrial project, a security apparatus, a cultural universe, and a lived reality for hundreds of millions. It produced genuine achievements—mass literacy, rapid industrialization, scientific breakthroughs, victory in World War II, and a space program that altered humanity’s sense of possibility. It also produced catastrophes—famine, terror, forced labor, censorship, mass surveillance, and a system of power that treated human beings as variables in a plan. Any serious account must hold these truths together without smoothing them into an easy verdict.

The Soviet Union emerged from the collapse of the Russian Empire and the violent upheavals of the early twentieth century. The 1917 revolutions did not merely replace one government; they shattered an entire social order. The Bolsheviks claimed to represent the interests of workers and peasants, promising land, peace, and bread. Yet they also built a party-state that concentrated authority, especially during the civil war that followed. Under conditions of existential threat—foreign intervention, internal rebellion, economic breakdown—coercion became normalized. A pattern was set early: crisis justified extraordinary power, and extraordinary power created new crises.

In the 1920s, the New Economic Policy introduced limited market mechanisms to stabilize the economy. But by the end of the decade, Stalin’s leadership pursued a different path: centralized planning, rapid industrialization, and collectivization of agriculture. This was not only an economic program but a social revolution from above. Millions of peasants were forced into collective farms; “kulaks” were targeted as class enemies; resistance was crushed. The human cost was immense, and the famines of the early 1930s—especially in Ukraine and other grain-producing regions—remain among the darkest episodes in Soviet history. Explaining them involves contested questions of intent, policy, and culpability, but the outcome is not contested: mass suffering on a scale that reshaped demography and memory.

Industrialization, meanwhile, transformed the country. Steel, coal, railways, and giant factories became symbols of modernity. Entire cities were built around production. The state mobilized labor through both propaganda and coercion, including the Gulag system of forced labor camps. For some, industrialization meant upward mobility: education, technical skills, and a sense of participating in a monumental national project. For others, it meant displacement, exhaustion, and fear. The Soviet promise of a rationally organized society depended on a paradox: the pursuit of planned order generated chronic shortages, informal networks, and a culture of improvisation.

The Great Terror of the late 1930s intensified the logic of suspicion. Purges targeted party members, military officers, intellectuals, and ordinary citizens accused of sabotage or disloyalty. Confessions were extracted, trials staged, and quotas sometimes applied to repression itself. The terror was not merely a tool for removing rivals; it became a method of governance, teaching society to anticipate punishment and to practice self-censorship. When fear becomes routine, trust becomes dangerous, and the social fabric reorganizes around silence.

World War II—known in the Soviet context as the Great Patriotic War—changed everything. The Nazi invasion in 1941 threatened the state’s existence and inflicted staggering losses. The war demanded extraordinary mobilization and produced extraordinary endurance. Soviet victory became a foundational narrative, a source of legitimacy, and a shared trauma. The heroism was real, but it coexisted with brutal discipline, including harsh treatment of perceived deserters and complex realities in occupied territories. After the war, the USSR emerged as a superpower, controlling much of Eastern Europe and entering a global rivalry with the United States.

The Cold War period combined security competition with domestic consolidation. The Soviet model offered an alternative to Western capitalism, and its appeal varied across the world depending on local conditions: colonial histories, inequality, and the desire for rapid modernization. At home, the post-Stalin era brought partial “thaw” and moments of cultural openness, especially under Khrushchev, alongside continued constraints on speech and political pluralism. The space race symbolized a high point of state capacity: Sputnik and Yuri Gagarin were not only technological achievements but ideological statements that planning and collective effort could outperform markets.

Yet the economic system faced structural problems. Central planning could mobilize resources for defined priorities—heavy industry, defense, prestige projects—but it struggled with flexibility, consumer goods, and innovation driven by feedback from real demand. Shortages were not accidents; they were features of a system that lacked accurate price signals and punished failure in ways that encouraged risk-avoidance and bureaucratic self-protection. Factories met quotas by optimizing what could be measured, not what people needed. Quality became secondary to output. Informal exchanges and “blat” networks—personal connections used to obtain scarce goods—became a parallel economy of favors, simultaneously undermining and stabilizing the system.

Culturally, the USSR was not a monochrome. It contained fierce debates, unofficial art scenes, underground literature, and a complex relationship to its own ideals. Many citizens believed sincerely in the project at different times, especially when it offered education, social mobility, and a language of dignity for the poor. Others complied outwardly while withdrawing inwardly. Some resisted and paid dearly. The Soviet attempt to engineer a new kind of person—rational, collective-minded, historically conscious—produced both genuine civic virtues and deep cynicism. When public language becomes mandatory, it risks losing meaning. People learn to speak in slogans while thinking in private.

The nationalities question was another central tension. The USSR presented itself as a union of republics with formal equality, but power was uneven. Moscow held decisive authority, and local identities were managed through a mixture of promotion, containment, and repression. The Soviet state invested in education and development across regions, but it also deported entire peoples during the war and suppressed nationalist movements when they threatened control. The result was a complicated legacy: some experienced Soviet rule as modernization and opportunity; others experienced it as colonization and cultural pressure.

By the 1980s, the system’s contradictions were becoming harder to ignore. Military spending and the burden of maintaining a global sphere of influence strained resources. The war in Afghanistan exposed limits and fueled disillusionment. Technological gaps widened. Everyday life often involved waiting, repairing, substituting, and planning around uncertainty. Many citizens developed a sophisticated skepticism: they knew the official story, and they knew the distance between story and life.

Gorbachev’s reforms—perestroika and glasnost—were an attempt to revitalize the system by introducing openness and restructuring. But reforms in a highly centralized state can behave like removing a single bolt from a tense machine: pressure redistributes unpredictably. Glasnost released suppressed histories and grievances; perestroika disrupted existing economic coordination without quickly replacing it with a stable alternative. National movements strengthened. Political legitimacy weakened. In 1991, the USSR dissolved, not only as a state but as a framework for identity and meaning for many who had lived inside it.

The aftermath complicates moral judgment further. The Soviet collapse brought new freedoms, but also economic shock, inequality, and social fragmentation in many post-Soviet states. For some, the 1990s felt like liberation; for others, like humiliation and loss. This is why Soviet memory remains contested. Nostalgia is not always an endorsement of repression; it is often a response to instability, to the disappearance of predictable structures, to the pain of seeing a life’s narrative declared worthless.

What, then, is the USSR’s significance? One way to frame it is as an attempt to force history to obey a blueprint. It sought to replace the spontaneous order of markets and plural politics with a planned economy and a monopoly on power justified by ideology. The experiment demonstrated the capacity of states to mobilize resources and transform societies quickly. It also demonstrated how easily that capacity can become cruelty when dissent is treated as treason and when human complexity is reduced to categories.

A C2-level understanding requires resisting simple metaphors. The USSR was not merely a prison, though it contained prisons. It was not merely a modernizer, though it modernized. It was not merely a dream, though many dreamed within it. It was a system that generated both meaning and fear, pride and silence, solidarity and suspicion. Its history is not only a warning about authoritarianism, though it is that. It is also a lesson about unintended consequences, about how political ideals can be used as tools of domination, and about how societies survive by creating informal human networks even inside rigid structures.

Perhaps the most honest conclusion is that the Soviet story is a tragedy of scale: a project that aimed at universal emancipation but repeatedly relied on coercion, and a state that achieved astonishing feats while consuming enormous human cost. To study it is not to choose between condemnation and admiration, but to learn how power behaves when it believes it has a monopoly on the future.`,
  wordCount: 1607,
  status: "unread"
},
  
];

const readingTextsWithAudio = readingTexts.map((t, i) => ({
  ...t,
  audioSrc: `audio/${i + 1}.mp3`,
  audioDuration: null // Будет определено при проверке
}));

// Export for use in main script
if (typeof module !== "undefined" && module.exports) {
  module.exports = readingTexts;
}

const videosData = [
  // A0 Level
  {
    id: 1,
    level: 'Pre-A1',
    title: 'Learn how to introduce yourself in English - A1 [with Brian and Emily]',
    description: '"Hello!" "Hi!" Do you know how to greet people in English? Greetings are very important in any language, so learn the basics for greetings in English here with lingoni ENGLISH!',
    duration: '2:34',
    link: 'https://www.youtube.com/embed/5StvZZccECg',
    thumbnail: 'https://i.ytimg.com/vi/5StvZZccECg/hqdefault.jpg',
    status: 'new',
    likes: 10000,
    views: 468000
  },
  {
    id: 2,
    level: 'A0',
    title: 'Number song 1-20 for children | Counting numbers | The Singing Walrus',
    description: 'The Singing Walrus presents "Number song 1-20 for children" - an upbeat chant that helps kids count the numbers 1-20. The kids all count from 1-20 together three times, each time counting faster than the previous. This is perfect for preschool aged children, and for young learners of ESL and EFL!',
    duration: '2:11',
    link: 'https://www.youtube.com/embed/D0Ajq682yrA',
    thumbnail: 'https://i.ytimg.com/vi/D0Ajq682yrA/hqdefault.jpg',
    status: 'new',
    likes: 320000,
    views: 111000000
  },
  {
    id: 3,
    level: 'Pre-A1',
    title: 'The Lion and the Mouse - Fairy tale - English Stories (Reading Books)',
    description: 'The Singing Walrus presents "Number song 1-20 for children" - an upbeat chant that helps kids count the numbers 1-20. The kids all count from 1-20 together three times, each time counting faster than the previous. This is perfect for preschool aged children, and for young learners of ESL and EFL!',
    duration: '8:01',
    link: 'https://www.youtube.com/embed/z46K8WqBFnw',
    thumbnail: 'https://i.ytimg.com/vi/z46K8WqBFnw/hqdefault.jpg',
    status: 'new',
    likes: 23000,
    views: 3300000
  },
  {
    id: 4,
    level: 'Pre-A1',
    title: 'Beginner Levels - Lesson 1: Nice To Meet You!',
    description: 'English For You - Learning English is much easier now! Beginner Levels - Lesson 1: Nice To Meet You! Hello there,',
    duration: '1:01:27',
    link: 'https://www.youtube.com/embed/IeaadwctbD4',
    thumbnail: 'https://i.ytimg.com/vi/IeaadwctbD4/hqdefault.jpg',
    status: 'new',
    likes: 350000,
    views: 22650000
  },{
    id: 5,
    level: 'A0',
    title: 'ABC Phonics Chant for Children | Sounds and Actions from A to Z',
    description: 'A phonics chant with a picture for each letter from A to Z Its designed to help children learn the sounds of the letters in the English alphabet. ',
    duration: '4:22',
    link: 'https://www.youtube.com/embed/ChqnN3cKzXQ',
    thumbnail: 'https://i.ytimg.com/vi/ChqnN3cKzXQ/hqdefault.jpg',
    status: 'new',
    likes: 381000,
    views: 66200000
  },
  {
    id: 6,
    level: 'Pre-A1',
    title: 'Beginner Levels - Lesson 2: How Are You?',
    description: '-',
    duration: '58:53',
    link: 'https://www.youtube.com/embed/S2lFmQcXsM4',
    thumbnail: 'https://i.ytimg.com/vi/S2lFmQcXsM4/hqdefault.jpg',
    status: 'new',
    likes: 68000,
    views: 6200000
  },
  {
    id: 7,
    level: 'A1',
    title: '🎧 A1 English for Absolute Beginners | DAILY ENGLISH LEARNING PODCAST',
    description: 'Are you just starting your English learning journey? 🎉 In this episode of English with Confidence, Eric & Ruby guide you through the basics of speaking English at the A1 level — perfect for beginners!',
    duration: '4:09',
    link: 'https://www.youtube.com/embed/ldnghHoCm1g',
    thumbnail: 'https://i.ytimg.com/vi/ldnghHoCm1g/hqdefault.jpg',
    status: 'new',
    likes: 10,
    views: 200
  },
  {
    id: 8,
    level: 'A1',
    title: '200 Practical English Sentences for Adult Beginners | A1 Level⭐',
    description: '-',
    duration: '1:04:52',
    link: 'https://www.youtube.com/embed/ujJNoiuEak8',
    thumbnail: 'https://i.ytimg.com/vi/ujJNoiuEak8/hqdefault.jpg',
    status: 'new',
    likes: 180,
    views: 4500
  },
  {
    id: 9,
    level: 'A1',
    title: 'Learning English Podcast for Beginners | A1 English Listening Practice',
    description: '-',
    duration: '8:54',
    link: 'https://www.youtube.com/embed/s2EYIDY8wSM',
    thumbnail: 'https://i.ytimg.com/vi/s2EYIDY8wSM/hqdefault.jpg',
    status: 'new',
    likes: 14500,
    views: 430000
  },
  {
    id: 10,
    level: 'Pre-A2',
    title: '30 Simple English Conversations for Beginners (A1-A2) | Real English for English Speaking Practice',
    description: '-',
    duration: '31:58',
    link: 'https://www.youtube.com/embed/ahPnCAklnYQ',
    thumbnail: 'https://i.ytimg.com/vi/ahPnCAklnYQ/hqdefault.jpg',
    status: 'new',
    likes: 600,
    views: 27000
  },
  {
    id: 11,
    level: 'A1',
    title: 'English Conversation Practice | Learn English with Easy Dialogue | English Podcast | Level A1',
    description: '-',
    duration: '18:32',
    link: 'https://www.youtube.com/embed/IiVw587yFQI',
    thumbnail: 'https://i.ytimg.com/vi/IiVw587yFQI/hqdefault.jpg',
    status: 'new',
    likes: 1400,
    views: 32000
  },
  {
    id: 12,
    level: 'Pre-A2',
    title: 'Tell Me About Yourself in English | Easy Conversation for Beginners (A1–A2) | English Podcast',
    description: '-',
    duration: '17:09',
    link: 'https://www.youtube.com/embed/4hrGELI9np8',
    thumbnail: 'https://i.ytimg.com/vi/4hrGELI9np8/hqdefault.jpg',
    status: 'new',
    likes: 3100,
    views: 62000
  },
  {
    id: 13,
    level: 'Pre-A2',
    title: 'Learn English with The Power of Gratitude in Everyday Life | Easy English Conversation & Practice',
    description: '-',
    duration: '13:19',
    link: 'https://www.youtube.com/embed/_KDwX3owGqE',
    thumbnail: 'https://i.ytimg.com/vi/_KDwX3owGqE/hqdefault.jpg',
    status: 'new',
    likes: 1350,
    views: 22550
  },
  {
    id: 14,
    level: 'Pre-A2',
    title: 'Master ALL English Tenses | A1-B2 English Grammar',
    description: '-',
    duration: '45:35',
    link: 'https://www.youtube.com/embed/XP5X6CC4edI',
    thumbnail: 'https://i.ytimg.com/vi/XP5X6CC4edI/hqdefault.jpg',
    status: 'new',
    likes: 18200,
    views: 426000
  },
  {
    id: 15,
    level: 'Pre-A2',
    title: 'English at the Restaurant | Easy Conversation Practice for Beginners (A1–A2) | English Podcast',
    description: '-',
    duration: '13:43',
    link: 'https://www.youtube.com/embed/6Mcn4k1EtZA',
    thumbnail: 'https://i.ytimg.com/vi/6Mcn4k1EtZA/hqdefault.jpg',
    status: 'new',
    likes: 1800,
    views: 43000
  },
  {
    id: 16,
    level: 'A2',
    title: 'Learn English for Beginners (A1–A2) – Greetings, Politeness & Questions Explained Simply',
    description: '-',
    duration: '14:37',
    link: 'https://www.youtube.com/embed/Nsxxw9_vTnY',
    thumbnail: 'https://i.ytimg.com/vi/Nsxxw9_vTnY/hqdefault.jpg',
    status: 'new',
    likes: 320,
    views: 17000
  },
  {
    id: 17,
    level: 'A2',
    title: 'Shopping for Clothes in English | Slow English Listening Practice (A1–A2)',
    description: '-',
    duration: '8:43',
    link: 'https://www.youtube.com/embed/ogcrUs3Hyqs',
    thumbnail: 'https://i.ytimg.com/vi/ogcrUs3Hyqs/hqdefault.jpg',
    status: 'new',
    likes: 20,
    views: 350
  },
  {
    id: 171,
    level: 'A2',
    title: 'Simple Daily Routine English | Easy English Listening Practice (A2 Level)',
    description: '-',
    duration: '12:48',
    link: 'https://www.youtube.com/embed/SztMnWtbOvc',
    thumbnail: 'https://i.ytimg.com/vi/SztMnWtbOvc/hqdefault.jpg',
    status: 'new',
    likes: 4000,
    views: 165000
  },
  {
    id: 172,
    level: 'A2',
    title: 'A2 Level English Listening Practice - Soft Skills',
    description: '-',
    duration: '14:04',
    link: 'https://www.youtube.com/embed/jqj5FdNIwsQ',
    thumbnail: 'https://i.ytimg.com/vi/jqj5FdNIwsQ/hqdefault.jpg',
    status: 'new',
    likes: 3200,
    views: 87000
  },
  {
    id: 18,
    level: 'A2',
    title: 'How Learning English Changed My Life Forever | English Listening A2 Podcast for Beginners',
    description: '-',
    duration: '20:10',
    link: 'https://www.youtube.com/embed/xioVn6MPsUc',
    thumbnail: 'https://i.ytimg.com/vi/xioVn6MPsUc/hqdefault.jpg',
    status: 'new',
    likes: 3500,
    views: 98000
  },
  {
    id: 19,
    level: 'A2',
    title: 'Small Talk in English – Level A2 | Speak Naturally in Real-Life Conversations | English Podcast',
    description: '-',
    duration: '16:14',
    link: 'https://www.youtube.com/embed/UEayzBngIaw',
    thumbnail: 'https://i.ytimg.com/vi/UEayzBngIaw/hqdefault.jpg',
    status: 'new',
    likes: 2200,
    views: 67000
  },
  {
    id: 20,
    level: 'A2',
    title: 'The TRUTH About Learning English – Real Talk About Struggles | English Listening Practice A2',
    description: '-',
    duration: '21:57',
    link: 'https://www.youtube.com/embed/ZSHMHU7gIpA',
    thumbnail: 'https://i.ytimg.com/vi/ZSHMHU7gIpA/hqdefault.jpg',
    status: 'new',
    likes: 2100,
    views: 55000
  },
  {
    id: 21,
    level: 'A2',
    title: 'How to Understand English Movies Without Subtitles',
    description: '-',
    duration: '5:40',
    link: 'https://www.youtube.com/embed/tB88DEBk5tw',
    thumbnail: 'https://i.ytimg.com/vi/tB88DEBk5tw/hqdefault.jpg',
    status: 'new',
    likes: 47000,
    views: 960000
  },
  {
    id: 22,
    level: 'A2',
    title: 'Talking about films – A2 English Listening Test',
    description: '-',
    duration: '2:51',
    link: 'https://www.youtube.com/embed/DURtS-YIB_A',
    thumbnail: 'https://i.ytimg.com/vi/DURtS-YIB_A/hqdefault.jpg',
    status: 'new',
    likes: 1000,
    views: 460000
  },
  {
    id: 23,
    level: 'C1',
    title: 'C1 English Listening Practice | Don’t Waste Another Year | Improve Your English Speaking & Listening',
    description: '-',
    duration: '43:44',
    link: 'https://www.youtube.com/embed/1xVuqqozjuA',
    thumbnail: 'https://i.ytimg.com/vi/1xVuqqozjuA/hqdefault.jpg',
    status: 'new',
    likes: 160,
    views: 6500
  },
  {
    id: 24,
    level: 'A2',
    title: 'Beginner Levels - Learn English through Oxford English video',
    description: '-',
    duration: '35:48',
    link: 'https://www.youtube.com/embed/YUlNbVLJTJo',
    thumbnail: 'https://i.ytimg.com/vi/YUlNbVLJTJo/hqdefault.jpg',
    status: 'new',
    likes: 206000,
    views: 10200000
  },
  {
    id: 25,
    level: 'Pre-B1',
    title: 'Mike Ross Interview with Harvey Specter | Suits',
    description: '-',
    duration: '8:52',
    link: 'https://www.youtube.com/embed/ImEnWAVRLU0',
    thumbnail: 'https://i.ytimg.com/vi/ImEnWAVRLU0/hqdefault.jpg',
    status: 'new',
    likes: 221000,
    views: 22000000
  },
  {
    id: 26,
    level: 'Pre-B1',
    title: 'How Positive Thinking Changes Your English Learning Journey | English Podcast | Level A2-B1',
    description: '-',
    duration: '16:31',
    link: 'https://www.youtube.com/embed/heyPsupmGPY',
    thumbnail: 'https://i.ytimg.com/vi/heyPsupmGPY/hqdefault.jpg',
    status: 'new',
    likes: 2000,
    views: 41000
  },
  {
    id: 27,
    level: 'Pre-B1',
    title: 'Improve Your English Listening (A2-B1) | Daily English Podcast for Learners!',
    description: '-',
    duration: '24:36',
    link: 'https://www.youtube.com/embed/h9wvs7IAgoY',
    thumbnail: 'https://i.ytimg.com/vi/h9wvs7IAgoY/hqdefault.jpg',
    status: 'new',
    likes: 1400,
    views: 51000
  },
  {
    id: 28,
    level: 'Pre-B1',
    title: '🎙️ Test Your English Level! (A2 – B1 – B2 Stories) |Daily English Podcast for Learners!',
    description: '-',
    duration: '24:23',
    link: 'https://www.youtube.com/embed/pRLvwdsxdCk',
    thumbnail: 'https://i.ytimg.com/vi/pRLvwdsxdCk/hqdefault.jpg',
    status: 'new',
    likes: 2000,
    views: 62500
  },
  {
    id: 29,
    level: 'Pre-B1',
    title: 'English Podcast For Easy English in Daily Life | Learn English Fast | Talk About Dreams and Goals',
    description: '-',
    duration: '31:07',
    link: 'https://www.youtube.com/embed/uVkFrqugXFQ',
    thumbnail: 'https://i.ytimg.com/vi/uVkFrqugXFQ/hqdefault.jpg',
    status: 'new',
    likes: 2250,
    views: 74500
  },
  {
    id: 30,
    level: 'Pre-B1',
    title: 'Talk About Your Weekend in English | Real English Conversation Practice (A2–B1) | English Podcast',
    description: '-',
    duration: '15:40',
    link: 'https://www.youtube.com/embed/qP_CFLYqsHU',
    thumbnail: 'https://i.ytimg.com/vi/qP_CFLYqsHU/hqdefault.jpg',
    status: 'new',
    likes: 3300,
    views: 76000
  },
  {
    id: 31,
    level: 'B1',
    title: '872. The Birthday Party (Learn English with a Short Story)',
    description: '-',
    duration: '47:28',
    link: 'https://www.youtube.com/embed/48ypNTal_NI',
    thumbnail: 'https://i.ytimg.com/vi/48ypNTal_NI/hqdefault.jpg',
    status: 'new',
    likes: 64300,
    views: 2350000
  },
  {
    id: 32,
    level: 'B1',
    title: 'B1 English Listening Practice | Time Will Pass Anyway | Slow English Podcast | Code Your English',
    description: '-',
    duration: '43:05',
    link: 'https://www.youtube.com/embed/TQDPuL64uwc',
    thumbnail: 'https://i.ytimg.com/vi/TQDPuL64uwc/hqdefault.jpg',
    status: 'new',
    likes: 450,
    views: 17100
  },
  {
    id: 33,
    level: 'B1',
    title: 'Stop Thinking Start Talking | Easy English Podcast for Conversation Practice B1 | Daily Life English',
    description: '-',
    duration: '23:41',
    link: 'https://www.youtube.com/embed/odLSgNSKuIg',
    thumbnail: 'https://i.ytimg.com/vi/odLSgNSKuIg/hqdefault.jpg',
    status: 'new',
    likes: 4820,
    views: 192000
  },
  {
    id: 34,
    level: 'Pre-B2',
    title: 'Learn English with SUITS (Pre B2 Level)',
    description: '-',
    duration: '23:55',
    link: 'https://www.youtube.com/embed/YZcjgKjVyXk',
    thumbnail: 'https://i.ytimg.com/vi/YZcjgKjVyXk/hqdefault.jpg',
    status: 'new',
    likes: 67000,
    views: 2350000
  },
  {
    id: 35,
    level: 'B2',
    title: 'The Future Mark Zuckerberg Is Trying To Build',
    description: '-',
    duration: '47:09',
    link: 'https://www.youtube.com/embed/oX7OduG1YmI',
    thumbnail: 'https://i.ytimg.com/vi/oX7OduG1YmI/hqdefault.jpg',
    status: 'new',
    likes: 121000,
    views: 4820000
  },
  {
    id: 36,
    level: 'Pre-C1',
    title: 'Elon Musk: A Different Conversation w/ Nikhil Kamath | Full Episode | People by WTF Ep. 16',
    description: '-',
    duration: '1:54:13',
    link: 'https://www.youtube.com/embed/Rni7Fz7208c',
    thumbnail: 'https://i.ytimg.com/vi/Rni7Fz7208c/hqdefault.jpg',
    status: 'new',
    likes: 262000,
    views: 8900000
  },
  {
    id: 37,
    level: 'B2',
    title: '38 Minutes of Real Life English Conversation - Intermediate level English Interview (B2 Level)',
    description: '-',
    duration: '38:21',
    link: 'https://www.youtube.com/embed/Op4cDgKtzC4',
    thumbnail: 'https://i.ytimg.com/vi/Op4cDgKtzC4/hqdefault.jpg',
    status: 'new',
    likes: 5500,
    views: 202000
  },
  {
    id: 38,
    level: 'B1',
    title: 'Learn English with Interesting Stories | B1 Level',
    description: '-',
    duration: '36:21',
    link: 'https://www.youtube.com/embed/U-4SsrkYW_I',
    thumbnail: 'https://i.ytimg.com/vi/U-4SsrkYW_I/hqdefault.jpg',
    status: 'new',
    likes: 700,
    views: 28000
  },
  {
    id: 39,
    level: 'B1',
    title: 'B1 Imitation Lesson | English Speaking Practice',
    description: '-',
    duration: '11:20',
    link: 'https://www.youtube.com/embed/gI7zvZ5sVS4',
    thumbnail: 'https://i.ytimg.com/vi/gI7zvZ5sVS4/hqdefault.jpg',
    status: 'new',
    likes: 4200,
    views: 145000
  },
  {
    id: 40,
    level: 'B2',
    title: 'B2 English Listening Practice | Your Mistakes Dont Define You | Improve Your English | ESL Speaking',
    description: '-',
    duration: '53:51',
    link: 'https://www.youtube.com/embed/OXfzqKijsmQ',
    thumbnail: 'https://i.ytimg.com/vi/OXfzqKijsmQ/hqdefault.jpg',
    status: 'new',
    likes: 1200,
    views: 51000
  },
  {
    id: 41,
    level: 'B2',
    title: 'B2 English Listening Practice | Understanding Your Core Values | Improve Your English Speaking | ESL',
    description: '-',
    duration: '46:30',
    link: 'https://www.youtube.com/embed/RDhRHvklA4s',
    thumbnail: 'https://i.ytimg.com/vi/RDhRHvklA4s/hqdefault.jpg',
    status: 'new',
    likes: 440,
    views: 17600
  },
  {
    id: 42,
    level: 'B2',
    title: 'The Trip to Norway 🇳🇴 Learn Vocabulary in Context [952]',
    description: '-',
    duration: '1:27:09',
    link: 'https://www.youtube.com/embed/sbMY6Z4bWfI',
    thumbnail: 'https://i.ytimg.com/vi/sbMY6Z4bWfI/hqdefault.jpg',
    status: 'new',
    likes: 5600,
    views: 170000
  },
  {
    id: 43,
    level: 'Pre-B2',
    title: 'Everyday English Practice: Chat Like a Native | Daily English Podcast for Learners!',
    description: '-',
    duration: '23:10',
    link: 'https://www.youtube.com/embed/QsY40TZs63g',
    thumbnail: 'https://i.ytimg.com/vi/QsY40TZs63g/hqdefault.jpg',
    status: 'new',
    likes: 21000,
    views: 665000
  },
  {
    id: 44,
    level: 'B2',
    title: 'Walk & Talk: London 🇬🇧',
    description: '-',
    duration: '1:16:03',
    link: 'https://www.youtube.com/embed/Rd8Auzn-KfI',
    thumbnail: 'https://i.ytimg.com/vi/Rd8Auzn-KfI/hqdefault.jpg',
    status: 'new',
    likes: 21100,
    views: 671000
  },
  {
    id: 45,
    level: 'Pre-C1',
    title: 'I Acted Rich vs Poor to See if I Was Treated Differently',
    description: '-',
    duration: '24:16',
    link: 'https://www.youtube.com/embed/mnmixPuLrsg',
    thumbnail: 'https://i.ytimg.com/vi/mnmixPuLrsg/hqdefault.jpg',
    status: 'new',
    likes: 61000,
    views: 1820000
  },
  {
    id: 46,
    level: 'Pre-C1',
    title: 'The Wolf of Wall Street (2013): TOP 3 BEST SCENES',
    description: '-',
    duration: '18:07',
    link: 'https://www.youtube.com/embed/LwG6aia2vn0',
    thumbnail: 'https://i.ytimg.com/vi/LwG6aia2vn0/hqdefault.jpg',
    status: 'new',
    likes: 9100,
    views: 1700000
  },
  {
    id: 47,
    level: 'Pre-C1',
    title: 'English Listening Practice - REAL Native Conversation! (B2 - C1)',
    description: '-',
    duration: '38:25',
    link: 'https://www.youtube.com/embed/kWXX-adhvTQ',
    thumbnail: 'https://i.ytimg.com/vi/kWXX-adhvTQ/hqdefault.jpg',
    status: 'new',
    likes: 4400,
    views: 131000
  },
  {
    id: 48,
    level: 'Pre-B2',
    title: 'Improve Your English by Shadowing Practice | B1 & B2 English Listening & Speaking Practice Podcast',
    description: '-',
    duration: '2:01:09',
    link: 'https://www.youtube.com/embed/gVtqUZRSTlc',
    thumbnail: 'https://i.ytimg.com/vi/gVtqUZRSTlc/hqdefault.jpg',
    status: 'new',
    likes: 900,
    views: 43500
  },
  {
    id: 49,
    level: 'Pre-B2',
    title: '🎧 Speak Like a Native – Secrets for Natural English | B1–B2 Listening Practice',
    description: '-',
    duration: '52:49',
    link: 'https://www.youtube.com/embed/amVN_9SmAM4',
    thumbnail: 'https://i.ytimg.com/vi/amVN_9SmAM4/hqdefault.jpg',
    status: 'new',
    likes: 14200,
    views: 719000
  },
  {
    id: 50,
    level: 'B2',
    title: 'SPEAK ENGLISH IN NEW YORK CITY S TIMES SQUARE (B2 Level)',
    description: '-',
    duration: '13:13',
    link: 'https://www.youtube.com/embed/LPlBhVCIwUE',
    thumbnail: 'https://i.ytimg.com/vi/LPlBhVCIwUE/hqdefault.jpg',
    status: 'new',
    likes: 380,
    views: 4600
  },
  {
    id: 51,
    level: 'B2',
    title: 'Stop Saying "It Is Snowing": How to Describe the NYC Blizzard Like a Native Speaker',
    description: '-',
    duration: '12:36',
    link: 'https://www.youtube.com/embed/rzvJa4vc49A',
    thumbnail: 'https://i.ytimg.com/vi/rzvJa4vc49A/hqdefault.jpg',
    status: 'new',
    likes: 390,
    views: 4200
  },
  {
    id: 52,
    level: 'Pre-B2',
    title: 'LEARN ENGLISH naturally with this Vlog (Comprehensible Input)',
    description: '-',
    duration: '15:28',
    link: 'https://www.youtube.com/embed/6i18Rsq4kBU',
    thumbnail: 'https://i.ytimg.com/vi/6i18Rsq4kBU/hqdefault.jpg',
    status: 'new',
    likes: 5500,
    views: 112000
  },
  {
    id: 53,
    level: 'B2',
    title: 'Learn English With This Vlog | Christmas Days at College & Taking Exams 🎄❄',
    description: '-',
    duration: '15:10',
    link: 'https://www.youtube.com/embed/4PpqRnEzmBE',
    thumbnail: 'https://i.ytimg.com/vi/4PpqRnEzmBE/hqdefault.jpg',
    status: 'new',
    likes: 241,
    views: 3350
  },
  {
    id: 53,
    level: 'B2',
    title: 'I Asked Tom Cruise How He Made $600 Million',
    description: '-',
    duration: '19:59',
    link: 'https://www.youtube.com/embed/vMcZyzTNoIc',
    thumbnail: 'https://i.ytimg.com/vi/vMcZyzTNoIc/hqdefault.jpg',
    status: 'new',
    likes: 31000,
    views: 835000
  },
  {
    id: 54,
    level: 'B2',
    title: 'Asking Dubai Moguls How They Got Rich!',
    description: '-',
    duration: '19:37',
    link: 'https://www.youtube.com/embed/vUumRjZX0n8',
    thumbnail: 'https://i.ytimg.com/vi/vUumRjZX0n8/hqdefault.jpg',
    status: 'new',
    likes: 49000,
    views: 2600000
  },
  {
    id: 55,
    level: 'Pre-C1',
    title: 'Asking Billionaire Women How They Got RICH!',
    description: '-',
    duration: '23:03',
    link: 'https://www.youtube.com/embed/2Q2JgVDvHV0',
    thumbnail: 'https://i.ytimg.com/vi/2Q2JgVDvHV0/hqdefault.jpg',
    status: 'new',
    likes: 66000,
    views: 2100000
  },
  {
    id: 56,
    level: 'Pre-C1',
    title: 'Asking the RICHEST People in the World How They Got RICH!',
    description: '-',
    duration: '31:01',
    link: 'https://www.youtube.com/embed/gBBlX7v0910',
    thumbnail: 'https://i.ytimg.com/vi/gBBlX7v0910/hqdefault.jpg',
    status: 'new',
    likes: 16200,
    views: 651000
  },
  {
    id: 57,
    level: 'Pre-C1',
    title: 'I Asked Robert Herjavec How He Made $500 Million',
    description: '-',
    duration: '21:13',
    link: 'https://www.youtube.com/embed/9QTBl0R_cs8',
    thumbnail: 'https://i.ytimg.com/vi/9QTBl0R_cs8/hqdefault.jpg',
    status: 'new',
    likes: 16100,
    views: 657000
  },
  {
    id: 58,
    level: 'C1',
    title: 'Asking Millionaire Mansion Owners How They Got RICH',
    description: '-',
    duration: '25:47',
    link: 'https://www.youtube.com/embed/Fe7v_SWuhY4',
    thumbnail: 'https://i.ytimg.com/vi/Fe7v_SWuhY4/hqdefault.jpg',
    status: 'new',
    likes: 12400,
    views: 397000
  },
  {
    id: 59,
    level: 'C1-Pro',
    title: 'The ENTIRE History of the United States of America | 4K Documentary (USA US) [Full Movie]',
    description: '-',
    duration: '4:13:02',
    link: 'https://www.youtube.com/embed/hxdSr03ULdM',
    thumbnail: 'https://i.ytimg.com/vi/hxdSr03ULdM/hqdefault.jpg',
    status: 'new',
    likes: 41000,
    views: 2500000
  },
  {
    id: 60,
    level: 'C1-Pro',
    title: 'ASSASSINS CREED Gameplay Walkthrough FULL GAME [4K 60FPS PC ULTRA] - No Commentary',
    description: '-',
    duration: '8:21:35',
    link: 'https://www.youtube.com/embed/aV3yOcF7kwA',
    thumbnail: 'https://i.ytimg.com/vi/aV3yOcF7kwA/hqdefault.jpg',
    status: 'new',
    likes: 890,
    views: 24500
  },
  {
    id: 61,
    level: 'C1-Pro',
    title: 'Mafia Definitive Edition FULL MOVIE (All Cutscenes) 4K 60FPS',
    description: '-',
    duration: '2:30:44',
    link: 'https://www.youtube.com/embed/PlGgRbXd7GM',
    thumbnail: 'https://i.ytimg.com/vi/PlGgRbXd7GM/hqdefault.jpg',
    status: 'new',
    likes: 6600,
    views: 590000
  },
  {
    id: 62,
    level: 'C1',
    title: 'C1 Advanced English Podcast (1 Hour) | Listening Practice for Natural Fluency',
    description: '-',
    duration: '47:02',
    link: 'https://www.youtube.com/embed/_iFZbo0XGuw',
    thumbnail: 'https://i.ytimg.com/vi/_iFZbo0XGuw/hqdefault.jpg',
    status: 'new',
    likes: 100,
    views: 3500
  },
  {
    id: 63,
    level: 'C1',
    title: 'Real English Conversation Practice (C1) – Improve Your Speaking & Listening FAST!',
    description: '-',
    duration: '22:46',
    link: 'https://www.youtube.com/embed/mo0-uqoaUwc',
    thumbnail: 'https://i.ytimg.com/vi/mo0-uqoaUwc/hqdefault.jpg',
    status: 'new',
    likes: 510,
    views: 12250
  },
  {
    id: 64,
    level: 'C1',
    title: 'C1 English Listening Practice | Stop Living on Autopilot | English Listening, Speaking & Shadowing',
    description: '-',
    duration: '48:16',
    link: 'https://www.youtube.com/embed/kyQL49fmZYo',
    thumbnail: 'https://i.ytimg.com/vi/kyQL49fmZYo/hqdefault.jpg',
    status: 'new',
    likes: 90,
    views: 3900
  },
  {
    id: 65,
    level: 'Pre-C2',
    title: 'C1–C2 English Listening Practice | 1 Hour of Real Conversations for Natural Fluency',
    description: '-',
    duration: '1:13:02',
    link: 'https://www.youtube.com/embed/63JLxW-RcN8',
    thumbnail: 'https://i.ytimg.com/vi/63JLxW-RcN8/hqdefault.jpg',
    status: 'new',
    likes: 60,
    views: 1600
  },
  {
    id: 66,
    level: 'Pre-C2',
    title: '1 Hour of Advanced English Listening (C1–C2) | Real-Life Conversations for Natural Fluency',
    description: '-',
    duration: '1:39:38',
    link: 'https://www.youtube.com/embed/sgLpn8Ey1vI',
    thumbnail: 'https://i.ytimg.com/vi/sgLpn8Ey1vI/hqdefault.jpg',
    status: 'new',
    likes: 82,
    views: 2250
  },
  {
    id: 67,
    level: 'C2',
    title: '2-Hour (C2 Level) Advanced English Listening Practice || C2 Level English Podcast for Learners',
    description: '-',
    duration: '2:10:04',
    link: 'https://www.youtube.com/embed/HaYUofSfQi4',
    thumbnail: 'https://i.ytimg.com/vi/HaYUofSfQi4/hqdefault.jpg',
    status: 'new',
    likes: 2325,
    views: 131200
  },
  {
    id: 68,
    level: 'C2',
    title: 'Learn English with Pirates Of The Caribbean',
    description: '-',
    duration: '29:00',
    link: 'https://www.youtube.com/embed/UUAENx1NANg',
    thumbnail: 'https://i.ytimg.com/vi/UUAENx1NANg/hqdefault.jpg',
    status: 'new',
    likes: 57000,
    views: 2350000
  },
  {
    id: 69,
    level: 'C2',
    title: 'Learn English With Avengers',
    description: '-',
    duration: '16:46',
    link: 'https://www.youtube.com/embed/OyNA4FA47do',
    thumbnail: 'https://i.ytimg.com/vi/OyNA4FA47do/hqdefault.jpg',
    status: 'new',
    likes: 42000,
    views: 1250000
  },
  {
    id: 69,
    level: 'C2',
    title: 'My Macbook Setup For Programming (Minimalist)',
    description: '-',
    duration: '31:23',
    link: 'https://www.youtube.com/embed/ffJBN0UdwXU',
    thumbnail: 'https://i.ytimg.com/vi/ffJBN0UdwXU/hqdefault.jpg',
    status: 'new',
    likes: 447,
    views: 14500
  },
  {
    id: 70,
    level: 'C2',
    title: 'Google I/O 25 Keynote',
    description: '-',
    duration: '1:56:35',
    link: 'https://www.youtube.com/embed/o8NiE3XMPrM',
    thumbnail: 'https://i.ytimg.com/vi/o8NiE3XMPrM/hqdefault.jpg',
    status: 'new',
    likes: 42100,
    views: 7230000
  },
  {
    id: 71,
    level: 'C2',
    title: 'House $1 Vs $100,000,000!',
    description: '-',
    duration: '17:02',
    link: 'https://www.youtube.com/embed/3ryID_SwU5E',
    thumbnail: 'https://i.ytimg.com/vi/3ryID_SwU5E/hqdefault.jpg',
    status: 'new',
    likes: 6400000,
    views: 399000000
  },
  {
    id: 72,
    level: 'C2',
    title: 'Telegram Creator on Elon Musk, Resisting FBI Attacks, and Getting Mugged in California',
    description: '-',
    duration: '58:47',
    link: 'https://www.youtube.com/embed/1Ut6RouSs0w',
    thumbnail: 'https://i.ytimg.com/vi/1Ut6RouSs0w/hqdefault.jpg',
    status: 'new',
    likes: 176000,
    views: 4500000
  },
  {
    id: 73,
    level: 'C2',
    title: '2026 IS YOUR YEAR IF YOU WANT IT TO BE - Andrew Tate Motivation for 2026 | New Year Motivation',
    description: '-',
    duration: '14:45',
    link: 'https://www.youtube.com/embed/RV8SaXLGB1M',
    thumbnail: 'https://i.ytimg.com/vi/RV8SaXLGB1M/hqdefault.jpg',
    status: 'new',
    likes: 500,
    views: 14400
  },
  {
    id: 74,
    level: 'C2',
    title: 'THIS IS THE YEAR Everything Changes - Andrew Tate Motivation for 2026 |New Year Motivational Speech',
    description: '-',
    duration: '14:05',
    link: 'https://www.youtube.com/embed/JkNHVh2kskg',
    thumbnail: 'https://i.ytimg.com/vi/JkNHVh2kskg/hqdefault.jpg',
    status: 'new',
    likes: 474,
    views: 18200
  },
  {
    id: 75,
    level: 'C2',
    title: 'ANDREW TATE - 20Minutes of Non-Stop Powerful Motivation',
    description: '-',
    duration: '20:55',
    link: 'https://www.youtube.com/embed/w-55s5-4wMA',
    thumbnail: 'https://i.ytimg.com/vi/w-55s5-4wMA/hqdefault.jpg',
    status: 'new',
    likes: 26200,
    views: 1120000
  },
  {
    id: 76,
    level: 'C2',
    title: 'One of the Greatest Speeches Ever | Jeff Bezos',
    description: '-',
    duration: '10:07',
    link: 'https://www.youtube.com/embed/EctzLTFrktc',
    thumbnail: 'https://i.ytimg.com/vi/EctzLTFrktc/hqdefault.jpg',
    status: 'new',
    likes: 152000,
    views: 8750000
  },
  {
    id: 77,
    level: 'C2',
    title: 'the BEST way to improve English speaking skills | 4.5 Hours of Super Sentences speaking practice',
    description: '-',
    duration: '4:31:19',
    link: 'https://www.youtube.com/embed/37x7oLjYPgM',
    thumbnail: 'https://i.ytimg.com/vi/37x7oLjYPgM/hqdefault.jpg',
    status: 'new',
    likes: 76200,
    views: 1350000
  },
  {
    id: 78,
    level: 'C2-Pro',
    title: 'They Went Too Far Into the Woods | Full Horror Movie in English',
    description: '-',
    duration: '1:26:36',
    link: 'https://www.youtube.com/embed/bjRr1EX-LN0',
    thumbnail: 'https://i.ytimg.com/vi/bjRr1EX-LN0/hqdefault.jpg',
    status: 'new',
    likes: 40,
    views: 3500
  },
  {
    id: 79,
    level: 'C2-Pro',
    title: '2025: WORLD FLOODED - 35 Floors to Survive | 2025 Full Movie | English | Adventure | Action',
    description: '-',
    duration: '1:08:02',
    link: 'https://www.youtube.com/embed/FOPV_t9SPlA',
    thumbnail: 'https://i.ytimg.com/vi/FOPV_t9SPlA/hqdefault.jpg',
    status: 'new',
    likes: 640,
    views: 310000
  },
  {
    id: 80,
    level: 'C2-Pro',
    title: 'FORGOTTEN SOLDIER – Woman Lone Survivor | 2026 Full Movie | Action | English | 4K',
    description: '-',
    duration: '1:00:34',
    link: 'https://www.youtube.com/embed/k40cV4_4irY',
    thumbnail: 'https://i.ytimg.com/vi/k40cV4_4irY/hqdefault.jpg',
    status: 'new',
    likes: 670,
    views: 138000
  },
  {
    id: 81,
    level: 'C2-Pro',
    title: 'How to Generate wealth? | Andrew Tate',
    description: '-',
    duration: '15:17',
    link: 'https://www.youtube.com/embed/DcDcz1EDIVY',
    thumbnail: 'https://i.ytimg.com/vi/DcDcz1EDIVY/hqdefault.jpg',
    status: 'new',
    likes: 450,
    views: 12500
  },
  {
    id: 82,
    level: 'C2-Pro',
    title: 'A Day in The Life With Andrew Tate On My $8,000,000 Lamborghini 63 Yacht',
    description: '-',
    duration: '23:54',
    link: 'https://www.youtube.com/embed/309EkzeWbfU',
    thumbnail: 'https://i.ytimg.com/vi/309EkzeWbfU/hqdefault.jpg',
    status: 'new',
    likes: 41000,
    views: 1600000
  },
  {
    id: 83,
    level: 'C2-Pro',
    title: 'Boring Day in the Life of a Miami Millionaire Trader',
    description: '-',
    duration: '20:02',
    link: 'https://www.youtube.com/embed/6pdOyBmOlf8',
    thumbnail: 'https://i.ytimg.com/vi/6pdOyBmOlf8/hqdefault.jpg',
    status: 'new',
    likes: 17200,
    views: 545000
  },
  {
    id: 84,
    level: 'C2-Pro',
    title: 'F1 - FORMULA ONE - The Original Movie Starring Sylvester Stallone | Hollywood English Action Movie',
    description: '-',
    duration: '1:41:25',
    link: 'https://www.youtube.com/embed/ZT23jkNSY0o',
    thumbnail: 'https://i.ytimg.com/vi/ZT23jkNSY0o/hqdefault.jpg',
    status: 'new',
    likes: 12600,
    views: 1450000
  },
  {
    id: 85,
    level: 'C2-Pro',
    title: 'Top 10 Most Beautiful City to live in USA',
    description: '-',
    duration: '26:17',
    link: 'https://www.youtube.com/embed/Zu_S2wLqMXM',
    thumbnail: 'https://i.ytimg.com/vi/Zu_S2wLqMXM/hqdefault.jpg',
    status: 'new',
    likes: 10200,
    views: 1620000
  }
];

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { videosData };
}
