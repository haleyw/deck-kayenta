import * as React from 'react';
import { connect } from 'react-redux';
import { SETTINGS } from '@spinnaker/core';
import { CanarySettings } from 'kayenta/canary.settings';
import { ICanaryState } from 'kayenta/reducers';
import { runSelector, serializedCanaryConfigSelector } from 'kayenta/selectors';

interface ISourceJsonStateProps {
  reportUrl: string;
  metricListUrl: string;
}

const SourceLinks = ({ reportUrl, metricListUrl }: ISourceJsonStateProps) => {
  return (
    <ul className="list-unstyled small">
      <li>
        <a target="_blank" href={reportUrl}>Report Source</a>
      </li>
      <li>
        <a target="_blank" href={metricListUrl}>Metrics Source</a>
      </li>
    </ul>
  );
};

const resolveReportUrl = (state: ICanaryState): string => {
  const canaryConfigId = serializedCanaryConfigSelector(state).id;
  const canaryRunId = runSelector(state).id;
  return `${SETTINGS.gateUrl}/v2/canaries/canary/${canaryConfigId}/${canaryRunId}?storageAccountName=${CanarySettings.storageAccountName}`;
};

const resolveMetricListUrl = (state: ICanaryState): string => {
  const metricSetPairListId = runSelector(state).result.metricSetPairListId;
  return `${SETTINGS.gateUrl}/v2/canaries/metricSetPairList/${metricSetPairListId}?storageAccountName=${CanarySettings.storageAccountName}`;
};

const mapStateToProps = (state: ICanaryState): ISourceJsonStateProps => {
  return {
    reportUrl: resolveReportUrl(state),
    metricListUrl: resolveMetricListUrl(state),
  };
};

export default connect(mapStateToProps)(SourceLinks);