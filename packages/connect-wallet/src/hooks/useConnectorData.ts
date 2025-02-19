import {useMemo} from 'react';
import {Connector} from 'wagmi';

import {ConnectorInstance} from '../types/connector';

import {useDefaultConnectors} from './useDefaultConnectors';

type UseConnectorDataResponse = Omit<ConnectorInstance, 'createConnector'> & {
  connector?: Connector;
};

/**
 * A hook for accessing connector data (e.g. icons, mobile links, etc.) outside
 * of the pendingConnector.
 */
export function useConnectorData({
  id,
}: {
  id?: string;
}): UseConnectorDataResponse {
  const {connectors} = useDefaultConnectors();

  const connectorData = useMemo(() => {
    // Search our collection of connectors for a matching id (e.g. `rainbowWallet` or `metaMask`).
    const data = connectors.find((item) => item.id === id);

    if (data) {
      const {
        connector,
        icon,
        id,
        marketingSite,
        modalConnector,
        name,
        qrCodeSupported,
      } = data;

      return {
        connector,
        icon,
        id,
        marketingSite,
        modalConnector,
        name,
        qrCodeSupported,
      };
    }

    return {
      icon: null,
      id: 'unknown',
      name: 'Unknown',
      qrCodeSupported: false,
    };
  }, [connectors, id]);

  return connectorData;
}
