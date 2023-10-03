import { useState, useEffect } from 'react'
import Marquee from 'react-fast-marquee'
import './Popup.css'

function formatKey(key: string) {
  return key
    .replace('_', ' ')
    .replace('fb', 'Facebook')
    .replace('ga', 'Google')
    .replace('roas', 'ROAS')
    .replace('ctr', 'CTR')
    .replace('cpc', 'CPC')
    .replace('cpm', 'CPM')
    .replace('cpa', 'CPA')
    .replace('roi', 'ROI')
    .replace('cvr', 'CVR')
    .replace('cpi', 'CPI')
    .replace('cpv', 'CPV')
    .replace('blended', 'Blended')
}

function App() {
  const [data, setData] = useState<any>({})

  useEffect(() => {
    fetch('https://staging.api.triplewhale.com/api/v2/bi/get-benchmarks-for-marketing')
      .then((res) => res.json())
      .then((res) => setData(res))
  }, [])

  return (
    <main>
      <p className="tw-index-text">Whale Watcher</p>
      {data && data.total && (
        <Marquee pauseOnHover={true}>
          {Object.keys(data.total).map((key: string) => (
            <p className="tw-ticker">
              {formatKey(key)} • {!key.includes('ctr') && !key.includes('roas') && '$'}
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
