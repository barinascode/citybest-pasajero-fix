import React, { ComponentType, useContext, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { TabItemProps } from './components/TabItem';

const TabContext = React.createContext({
    activeTabIndex: 0,
    changeTab: (index: number) => {}
});

export function useTabs() {
    const state = useContext(TabContext);
    return state;
}

export interface TabProps {
    children: React.ComponentType<TabItemProps>[];
    activeTab: number;
}

const initialLayout = { width: Dimensions.get('window').width };

export default function Tabs({ children, activeTab = 0 }: TabProps) {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [routes, setRoutes] =
        useState<Array<{ key: string; title: string }>>();
    const [routesMap, setRoutesMap] = useState<{
        [key: string]: ComponentType<TabItemProps>;
    }>();

    const changeTab = (tabIndex: number) => setActiveTabIndex(tabIndex);

    /*   const extractRoutes = React.useMemo(
    () => () => {
      const routesMap: {
        [key: string]: ComponentType<TabItemProps>;
      } = {};
      const routesIndexes: Array<{ key: string; title: string }> = [];

      children.forEach((child: React.ComponentType<TabItemProps>) => {
        routesMap[child] = child;
        routesIndexes.push({ key: child.props.key, title: child.props.title });
      });

      setRoutesMap(routesMap);
      setRoutes(routesIndexes);
    },
    [children]
  );
 */
    useEffect(() => {
        /* extractRoutes(); */
    }, []);

    return (
        <TabContext.Provider value={{ activeTabIndex, changeTab }}>
            {/*   <TabView
        navigationState={{ index: activeTabIndex, routes }}
        renderScene={renderScene}
        onIndexChange={changeTab}
        initialLayout={initialLayout}
      /> */}
        </TabContext.Provider>
    );
}
