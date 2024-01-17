import { useState, useEffect } from 'react'
import Marquee from 'react-fast-marquee'
import TestData from './data'

import AMAZON from '../assets/amazon.svg'
import BING from '../assets/bing.svg'
import BLENDED from '../assets/blended.svg'
import FACEBOOK from '../assets/facebook.svg'
import GOOGLE from '../assets/google.svg'
import PINTEREST from '../assets/pinterest.svg'
import SNAPCHAT from '../assets/snapchat.svg'
import TIKTOK from '../assets/tiktok.svg'
import TWITTER from '../assets/twitter.svg'
import WHALE from '../assets/whale.svg'

import './Popup.css'

const isDev = import.meta.env.DEV

function formatKey(key: string) {
  const word = key
    .replace('_', ' ')
    .replace('fb', '')
    .replace('ga', '')
    .replace('tt', '')
    .replace('tw', '')
    .replace('pin', '')
    .replace('sc', '')
    .replace('roas', 'ROAS')
    .replace('cpm', 'CPM')
    .replace('cpa', 'CPA')
    .replace('ctr', 'CTR')
    .replace('cpc', 'CPC')
    .replace('blended', 'Blended')

  return word.charAt(0).toUpperCase() + word.slice(1)
}

function formatImage(key: string) {
  if (key.includes('amazon')) {
    return AMAZON
  } else if (key.includes('bing')) {
    return BING
  } else if (key.includes('blended')) {
    return BLENDED
  } else if (key.includes('fb') || key.includes('facebook')) {
    return FACEBOOK
  } else if (key.includes('ga') || key.includes('google')) {
    return GOOGLE
  } else if (key.includes('pin') || key.includes('pinterest')) {
    return PINTEREST
  } else if (key.includes('sc') || key.includes('snapchat')) {
    return SNAPCHAT
  } else if (key.includes('tt') || key.includes('tiktok')) {
    return TIKTOK
  } else if (key.includes('tw') || key.includes('twitter')) {
    return TWITTER
  } else {
    return WHALE
  }
}

function formatNumber(num: number) {
  return num ? num.toFixed(2).replace('.00', '') : 0
}

function App() {
  const [data, setData] = useState<any>({})
  const [isPopout, setIsPopout] = useState<boolean>(!!window.location.search.includes('popout'))
  const [speed, setSpeed] = useState<number>(50)

  useEffect(() => {
    if (isDev) {
      setData(TestData)
    } else {
      fetch(
        'https://api.triplewhale.com/api/v2/bi/get-benchmarks-for-marketing?requester=triplewhale',
      )
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((err) => {
          console.log(err)
          setData(TestData)
        })
    }
  }, [])

  const addToActiveTab = () => {
    const createPopout = {
      url: 'popup.html?popout=true',
      type: 'popup',
      height: 85,
    }
    chrome.windows.create(createPopout as any, (window: Window | any) => {
      setIsPopout(true)
    })
    window.close()
  }

  return (
    <main>
      <div className="ww-index-desc">
        <div className="ww-desc-top">
          <img src={WHALE} />
          <p className="ww-index-text ww-index-text-header">Whale Watcher</p>
        </div>
        <div className="ww-index-text ww-small ww-wrap">
          Based on the performance of 10k+ stores over the past 4 weeks
        </div>
        {!isPopout && (
          <a onClick={addToActiveTab} className="ww-small ww-index-text ww-index-link">
            Pop out window?
          </a>
        )}
      </div>
      {data && data.total && (
        <Marquee pauseOnHover={true} speed={speed}>
          {Object.keys(data.total).map((key: string) => (
            <p className="tw-ticker" key={key}>
              <img src={formatImage(key)} /> {formatKey(key)} •{' '}
              {!key.includes('ctr') && !key.includes('roas') && '$'}
              {formatNumber(data.total[key])}
              {key.includes('ctr') && '%'}
              <span
                className="tw-ticker-change"
                style={{
                  color: data.compression[key] < 0 ? 'rgb(252, 10, 84)' : 'rgb(22, 206, 185)',
                }}
              >
                <span className="tw-ticker-change-chevron">
                  <span
                    className={'tw-chevron ' + (data.compression[key] >= 0 ? 'top' : 'bottom')}
                  ></span>
                </span>
                {formatNumber(data.compression[key])}%
              </span>
              &nbsp;
            </p>
          ))}
        </Marquee>
      )}
    </main>
  )
}

export default App
