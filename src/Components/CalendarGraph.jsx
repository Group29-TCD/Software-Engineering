import { ResponsiveCalendar } from '@nivo/calendar';
import React, { useState, useEffect } from 'react';

export function CalendarGraph(fullGraph, val, loading, settings, paused) {
  const [loaded, setLoaded] = useState();
  const [data, setData] = useState(null);
  const [refreshInterval, setRefreshInterval] = useState();
  const [initialCall, setInitialCall] = useState(true);
  const [dataFinished, setDataFinished] = useState(false);
  const [changeValue, setChangeValue] = useState('');
  const [value, setValue] = useState();

  useEffect(() => {
    const loadData = () => {
      const getData = settings.getData.bind(this);
      getData(value).then(data => {
        const smlData = data;
        setLoaded(true);
        setData(smlData);
      });
    };

    const loadDataCont = () => {
      const getData = settings.refreshMethod.bind(this);
      getData(value).then(data => {
        if (data !== -1) {
          const smlData = data;
          setLoaded(true);
          setData(smlData);
        } else {
          setDataFinished(true);
          setInitialCall(true);
        }
      });
    };
    const refresh = async () => {
      setInitialCall(false);
      loadData();
    };
    const refreshCont = async () => {
      loadDataCont();
    };
    setRefreshInterval(
      setInterval(async () => {
        // Setting the window interval on load (mounting)
        if (!loading) {
          setLoaded(false);
          setInitialCall(true);
          setDataFinished(false);
        }
        // update state based on parameters
        if (changeValue !== value) {
          setChangeValue(value);
          setValue(val);
          setDataFinished(false);
          setInitialCall(true);
        }
        if (initialCall && value && !dataFinished && loading) {
          setChangeValue(value);
          await refresh();
        } else if (!initialCall && value && !dataFinished && loading) {
          await refreshCont();
        }
      }, settings.refreshTime)
    );
    return function cleanup() {
      clearInterval(refreshInterval);
    };
  }, [
    settings.refreshTime,
    loading,
    changeValue,
    value,
    initialCall,
    dataFinished,
    val,
    refreshInterval,
    settings.getData,
    settings.refreshMethod,
  ]);

  const tooltip = function(click, url) {
    return (
      <div className="iframe-container">
        <iframe
          src={url + click.indexValue}
          className="iframe"
          title="tooltip-option-2"
        />
      </div>
    );
  };

  // this method sets up the day for today in the calendar graph!
  const findTodaysDate = () => {
    const today = new Date();
    const date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    return date;
  };

  //this method sets the start date of the calendar to January 1st 1 year before the current year
  const findStartDate = () => {
    const today = new Date();
    const date = today.getFullYear() - 1 + '-01-01';
    return date;
  };

  let margin = {};
  let classname = '';
  if (fullGraph) {
    margin = { top: 5, right: 60, bottom: 80, left: 80 };
    classname = 'full-graph-container';
    if (settings.onClick) {
    }
  } else {
    margin = { top: 0, right: 0, bottom: 0, left: 0 };
    classname = 'Graph-Container-Card';
  }
  return (
    <div className={classname}>
      {loaded === false ? (
        'Loading...'
      ) : (
        <ResponsiveCalendar
          data={data}
          from={findStartDate()}
          to={findTodaysDate()}
          emptyColor="#eeeeee"
          colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'row',
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: 'right-to-left',
            },
          ]}
        />
      )}
    </div>
  );
}
