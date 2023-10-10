import { useState, useEffect } from 'react'
import Marquee from 'react-fast-marquee'
import TestData from './data'

import Whale from '../assets/whale.svg'
import Blended from '../assets/blended.svg'
import FACEBOOK from '../assets/facebook.svg'
import GOOGLE from '../assets/google.svg'
import TIKTOK from '../assets/tiktok.svg'
import TWITTER from '../assets/twitter.svg'
import PINTEREST from '../assets/pinterest.svg'
import SNAPCHAT from '../assets/snapchat.svg'

import './Popup.css'

const isDev = import.meta.env.DEV

function formatKey(key: string) {
  return key
    .replace('_', ' ')
    .replace('fb', '')
    .replace('ga', '')
    .replace('tt', '')
    .replace('tw', '')
    .replace('pin', '')
    .replace('sc', '')
    .replace('roas', 'ROAS')
    .replace('cpm', 'CPM')
    .replace('ctr', 'CTR')
    .replace('cpc', 'CPC')
    .replace('blended', 'Blended')
}

function formatImage(key: string) {
  if (key.includes('fb')) {
    return FACEBOOK
  } else if (key.includes('ga')) {
    return GOOGLE
  } else if (key.includes('tt')) {
    return TIKTOK
  } else if (key.includes('tw')) {
    return TWITTER
  } else if (key.includes('pin')) {
    return PINTEREST
  } else if (key.includes('sc')) {
    return SNAPCHAT
  } else if (key.includes('blended')) {
    return Blended
  } else {
    return Whale
  }
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
        'https://staging.api.triplewhale.com/api/v2/bi/get-benchmarks-for-marketing?requester=triplewhale',
      )
        .then((res) => res.json())
        .then((res) => setData(res))
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
          <img src={Whale} />
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
              {data.total[key]}
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
                {data.compression[key]}%
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
