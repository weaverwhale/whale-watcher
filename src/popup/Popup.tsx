import { useState, useEffect } from 'react'
import Marquee from 'react-fast-marquee'
import TestData from './data'
import Whale from '../assets/whale.svg'
import Blended from '../assets/blended.svg'
import GA from '../assets/ga.svg'
import FB from '../assets/fb.svg'

import './Popup.css'

function formatKey(key: string) {
  return key
    .replace('_', ' ')
    .replace('fb', '')
    .replace('ga', '')
    .replace('roas', 'ROAS')
    .replace('cpm', 'CPM')
    .replace('ctr', 'CTR')
    .replace('cpc', 'CPC')
    .replace('blended', 'Blended')
}

function formatImage(key: string) {
  if (key.includes('fb')) {
    return FB
  } else if (key.includes('ga')) {
    return GA
  } else if (key.includes('blended')) {
    return Blended
  } else {
    return Whale
  }
}

function App() {
  const [data, setData] = useState<any>({})

  useEffect(() => {
    if (import.meta.env.DEV) {
      setData(TestData)
    } else {
      fetch('https://staging.api.triplewhale.com/api/v2/bi/get-benchmarks-for-marketing')
        .then((res) => res.json())
        .then((res) => setData(res))
    }
  }, [])

  return (
    <main>
      <div className="ww-index-desc">
        <div className="ww-desc-top">
          <img src={Whale} />
          <p className="ww-index-text">Whale Watcher</p>
        </div>
        <div className="ww-index-text ww-small ww-wrap">
          Based on real-time performance of 10k+ stores over the past 4 weeks
        </div>
      </div>
      {data && data.total && (
        <Marquee pauseOnHover={true}>
          {Object.keys(data.total).map((key: string) => (
            <p className="tw-ticker">
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
