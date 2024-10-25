import { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import { TwitterForm } from './components/TwitterForm'
import { Tweet } from './components/Tweet'
import { v4 } from 'uuid'
import { getAvatar, getRandomImage } from './utils/generateImages'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSearch } from '@fortawesome/free-solid-svg-icons'
import { TrendItem } from './components/TrendItem'
import { FollowItem } from './components/FollowItem'

function App() {
  const [tweets, setTweets] = useState([])

  useEffect(() => {
    const interval = setInterval(() => {
      addNewRandomTweets()
    },20000)
    return () => clearInterval(interval)
  }, [])

  const addNewRandomTweets = () => {
    const randomTweets = [
      'Did you know that black holes can slow down time? 🌀 #ScienceFacts',
      'I can’t believe how fast technology is evolving! 🚀 #FutureTech',
      'Who else is excited for the next Mars mission? 🛰️ #SpaceExploration',
      'Football is life! Can’t wait for the next Premier League match! ⚽ #FootballFan',
      'Just finished my leg day workout. Feeling stronger every day! 🏋️‍♂️ #FitnessJourney',
      'The new protein shake I tried today is amazing! 🥤 #GymLife',
      'Did you know the human brain weighs about 3 pounds? 🧠 #RandomFacts',
      'Any predictions for the next Champions League game? ⚽ #FootballTalk',
      'Science is all about asking the right questions. 🤔 #StayCurious',
      'Trying out a new HIIT workout today. Let’s get it! 🔥 #TrainingHard',
      'The universe is constantly expanding. Mind-blowing! 🌌 #Cosmos',
      'What’s the best post-workout meal? Looking for some ideas! 🍽️ #Gains',
      'Physics explains how the world works, but football explains why! ⚽ #GameTime',
      'My favorite part of the gym routine? Definitely deadlifts! 🏋️‍♂️ #StrengthTraining',
      'Has anyone else been following the latest space telescope discoveries? 🔭 #AstroNews'
    ];
    
    const randomTweet = randomTweets[Math.floor(Math.random() * randomTweets.length)]

    addNewTweet(randomTweet, Math.random() > 0.6)
  }

  const addNewTweet = (content, includeImage = false) => {
    const newTweet = {
      id: v4(),
      name: "User",
      username: `user${Math.floor(Math.random() * 1000)}`,
      avatar: getAvatar(`user${Math.floor(Math.random() * 1000)}@email.com`),
      content,
      time: new Date().toLocaleString([],{
        hour: '2-digit',
        minute: '2-digit'
      }),
      image: includeImage ? getRandomImage() : null,
      likes: 0,
      retweets: 0,
      comments: 0
    }
    setTweets((prevTweets) => [newTweet, ...prevTweets])
  }

  return (
      <div className='flex mx-auto max-w-7xl'>
        <Sidebar/>
        <main className='flex-grow border-l border-r border-gray-700 max-w-xl'>
          <header className='sticky top-0 z-10 bg-twitter-background bg-opacity-80 backdrop-blur-sm'>
            <h2 className='px-4 py-3 text-xl font-bold'>For you</h2>
          </header>
          <TwitterForm onTweet={(content) => addNewTweet(content, Math.random() > 0.6)}/>
          <div>
            {tweets.map(tweet => (
              <Tweet key={tweet.id} tweet={tweet}/>
            ))}
          </div>
        </main>
        <aside className='hidden xl:block w-80 px-4'>
          <div className='sticky top-0 pt-2'>
            <div className='relative'>
              <FontAwesomeIcon icon={faSearch} className='absolute top-3 left-3 text-gray-500'/>
              <input placeholder='Seacrh Twitter' className='w-full bg-gray-800 text-white rounded-full outline-none py-2 pl-10 pr-4'/>
            </div>
            <div className='bg-gray-800 rounded-xl mt-4 p-4'>
              <h2 className='font-bold text-xl mb-4'>Subscribe to Premium</h2>
              <p className='text-gray-4-500 mb-4'>Subscribe to unlock new features and if eligible, receive a share of ads revenue.</p>
              <button className='bg-twitter-blue text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition duration-200'>Subscribe</button>
            </div>
            <div className='bg-gray-800 rounded-xl mt-4 p-4'>
              <h2 className='font-bold text-xl mb-4'>Whats happening</h2>
              <TrendItem category="NFL . LIVE" name="Cardinals bills"/>
              <TrendItem category="Sports * Trending" name="Kyle Durger"/>
              <TrendItem category="Sports * Trending" name="Steven Hamer" tweetCount="9,153 posts"/>
              <TrendItem category="Sports * TrendingE" name="Bryce Young" tweetCount="3,633 posts"/>
              <TrendItem category="Sports * Trending" name="Daboll" tweetCount="1,322 posts"/>
            </div>
            <div className='bg-gray-800 rounded-xl mt-4 p-4'>
              <h2 className='font-bold text-xl mb-4'>who to follow</h2>
              <FollowItem name="Cristiano Ronaldo " username="Cr7" isVerified={true}/>
              <FollowItem name="Pablo - Marçal  " username="Marcal" isVerified={true}/>
              <FollowItem name="Elon -  Musk " username="elonmusk" isVerified={true}/>
              <FollowItem name="Anitta " username="anitta" isVerified={false}/>
              <FollowItem name="Bruna Marquezine " username="brumarquezine" isVerified={false}/>
            </div>
          </div>
        </aside>
      </div>
  )
}

export default App
