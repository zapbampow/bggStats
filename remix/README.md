Additional Aggregator Logic
- when a making a selection, clear all other filters because the filter tree will be different
- This should include when updating a 'how many' filter 
- It's possible that how many needs it's own seperate filter tree. I need to think through it a bit more.


## Next
- Add a nav menu that slides in
  - About with history
  - Link to github
  - Clear data
- Add icon for sorting in the th tags and add cursor pointer on hover of the sortable columns
  - [Example](https://codesandbox.io/s/github/tanstack/table/tree/main/examples/react/sorting?from-embed=&file=/src/main.tsx:2926-2975)
- add 'this year' and 'last year' as date range options
- make sure every filter selector has a trash can icon

## What this app doesn't do
- Keep everything totally in sync. If you go back and update data that's already stored in the app, then it won't know about those updates. It only goes and gets your newest plays.

## Other Options
Board Game Stats App likely does a lot of this and certainly does a lot more. It is very popular and the people who use it seem to love it. The guy who built it also built the official BGG app. So he clearly knows what he's doing. https://www.bgstatsapp.com/

Board Gamer Tools http://www.boredgamertools.com/
Has some nice pie charts based on your play data along with piles of charts with your play data. It also has some features around your collection, including a recommendation tool for games you may like.

http://www.sheltonsonline.net/bggtools/getplays
View play data. Download as excel sheet. Last time I went here it was down because some stuff when wrong when updating their site. But it sounded like he planned on getting it back up at some point.

## About this app
I've been recording the games I play since 2009. At the end of every year I look to see how many games I played, what I played the most of, etc. Over the last few years begun recording more information, like who I played with, who won, where we played. With that data I asked more complex questions. How many games did I play with just my wife and kids? How many games did each of us win? What games did we play the most of?

For a couple of years I downloaded my play data from [a tool I found on BGG](http://www.sheltonsonline.net/bggtools/getplays). I would download a csv file, open it in Excel, and build formulas to calculate what I wanted to know. But every year I had to relearn how to do that in Excel. 

Then I thought, "Clayton, you're a developer. Why don't you build something to get all that data and answer your questions with the tools you ARE familiar with?"

The first idea was to create a system where the user could build a question using a set of selectors that created an question sentence. "How many games did I play between Jan 1, 2021 and Dec 31, 2021? Who did I play 7 Wonders with in Atlanta, GA? How many games did I win playing with only these 3 people?" I largely built it out, but it was pretty ugly and I couldn't come up with a design that looked even remotely good on mobile. 

Then I had a series of conversations with my wife that made me realize I could get all the same questions answered more easily, and it would look a lot better, if I took a dashboard style approach. The filtering code didn't change at all. It was just a matter of creating some chart components that allowed drilling down into the data by interacting with them. So I started down the path of redesigning and am pretty happy with the result.

I created this primarily for myself. I wanted to get answers to my particular questions. I was interested in the technical challenges coding it would entail. I happened to have a little extra time in my life this year to work on something like this more regularly.

But I'm making it available to the broader community to use too. You may hate it or love it. It may not answer the particular questions you want answered or in the way you want them. But I hope that some folks find it helpful.

If it isn't helpful, then there are awesome people out there who have their own projects to let you see your play data in other ways.

[Board Game Stats App](https://www.bgstatsapp.com/) likely does a lot of this and certainly does a lot more. It is very popular and the people who use it seem to love it (I've never used it). The guy who built it also built the official BGG app. So he clearly knows what he's doing. [Give them some geekgold](https://boardgamegeek.com/user/OurBGStats)

[Board Gamer Tools](http://www.boredgamertools.com/)
Has some nice pie charts based on your play data along with piles of charts with your play data. It also has some features around your collection, including a recommendation tool for games you may like. [Give hime some geekgold](https://boardgamegeek.com/user/T1m0thy)

[Christian Shelton's Plays Download Tool](http://www.sheltonsonline.net/bggtools/getplays)
View play data. Download as excel sheet. This is where I used to download all my data. [Give him some geekgold](https://boardgamegeek.com/user/cshelton)


### BGG's Data
BGG's API gives access to tons of data. For recorded plays it includes all of the following.

```
TODO: put all the fields here
```

Because I don't record all those things, like color, I haven't included it in this app. All of that could certainly be added at some point, but version 1, which could very likely be the end of it, only includes things that I record and care about.

### Bad data
Building this app I realized how bad my data is! I've been inconsistent in what I record. I started just record that I played a game. Sometimes I might include other information. The last couple of years I've start recording the names of the other players, the location, and the winner.
