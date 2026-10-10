import type { Topic } from './types';
import { measureTopic } from './measure';
import { multiplesTopic } from './multiples';
import { vectorsTopic } from './vectors';
import { speedTopic } from './speed';
import { averageSpeedTopic } from './averageSpeed';
import { dtGraphTopic } from './dtGraph';
import { stGraphTopic } from './stGraph';
import { accelerationTopic } from './acceleration';
import { freeFallTopic } from './freeFall';
import { orbitalSpeedTopic, lightTimeTopic, lightYearTopic, hubbleTopic } from './space';
import { weightTopic, densityTopic, densityMeasureTopic } from './matter';
import { springTopic, resultantTopic, fmaTopic, momentsTopic } from './forces';
import { momentumTopic, conservationTopic, impulseTopic } from './momentum';
import { kePeTopic, energyTransferTopic, workTopic, powerTopic, efficiencyTopic } from './energy';
import { pressureTopic, liquidPressureTopic } from './pressure';
import { kelvinTopic, boyleTopic } from './particles';
import { shcTopic } from './heat';
import { waveSpeedTopic } from './waves';
import { reflectionTopic, refractiveIndexTopic } from './optics';
import { emWavesTopic, soundTopic } from './emSound';
import { chargeTopic, voltsTopic, resistanceTopic, wireTopic, powerTopicE, kwhTopic } from './electricity';
import { seriesTopic, parallelTopic, dividerTopic, fuseTopic } from './circuits';
import { transformerTopic, transmissionTopic } from './emEffects';
import { nuclideTopic, countRateTopic, halfLifeTopic, decayTopic } from './nuclear';
import { graphSkillsTopic, dataSkillsTopic } from './revision';

export const topics: Record<string, Topic> = Object.fromEntries(
  [
    measureTopic,
    multiplesTopic,
    vectorsTopic,
    speedTopic,
    averageSpeedTopic,
    dtGraphTopic,
    accelerationTopic,
    stGraphTopic,
    freeFallTopic,
    weightTopic,
    densityTopic,
    densityMeasureTopic,
    springTopic,
    resultantTopic,
    fmaTopic,
    momentsTopic,
    momentumTopic,
    conservationTopic,
    impulseTopic,
    kePeTopic,
    energyTransferTopic,
    workTopic,
    powerTopic,
    efficiencyTopic,
    pressureTopic,
    liquidPressureTopic,
    kelvinTopic,
    boyleTopic,
    shcTopic,
    waveSpeedTopic,
    reflectionTopic,
    refractiveIndexTopic,
    emWavesTopic,
    soundTopic,
    chargeTopic,
    voltsTopic,
    resistanceTopic,
    wireTopic,
    powerTopicE,
    kwhTopic,
    seriesTopic,
    parallelTopic,
    dividerTopic,
    fuseTopic,
    transformerTopic,
    transmissionTopic,
    nuclideTopic,
    countRateTopic,
    halfLifeTopic,
    decayTopic,
    graphSkillsTopic,
    dataSkillsTopic,
    orbitalSpeedTopic,
    lightTimeTopic,
    lightYearTopic,
    hubbleTopic,
  ].map((t) => [t.id, t]),
);
