import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width } = useWindowDimensions();

  return useMemo(() => {
    const isDesktop = width >= 1024;
    const isTablet = width >= 600;
    const isMobile = width < 600;

    return {
      width,
      isMobile,
      isTablet,
      isDesktop,
      gridGap: isDesktop ? 24 : isTablet ? 18 : 12,
      containerMaxWidth: isDesktop ? 980 : isTablet ? 760 : width,
      titleSize: isDesktop ? 36 : isTablet ? 34 : 32,
      cardTitleSize: isDesktop ? 20 : 18,
      cardDescriptionSize: isDesktop ? 15 : 14
    };
  }, [width]);
}
