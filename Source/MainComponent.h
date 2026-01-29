#pragma once

#include <JuceHeader.h>

//==============================================================================
/*
    このコンポーネントはアプリのメイン画面であり、
    オーディオ処理の中心となる場所です。
*/
class MainComponent : public juce::AudioAppComponent
{
public:
    //==============================================================================
    MainComponent();
    ~MainComponent() override;

    //==============================================================================
    void prepareToPlay(int samplesPerBlockExpected, double sampleRate) override;
    void getNextAudioBlock(const juce::AudioSourceChannelInfo& bufferToFill) override;
    void releaseResources() override;

    //==============================================================================
    void paint(juce::Graphics& g) override;
    void resized() override;

private:
    //==============================================================================
    // メンバー変数はここに書きます
    std::unique_ptr<juce::AudioDeviceSelectorComponent> audioSettingsComp;

    juce::String currentDeviceName;
    double currentSampleRate = 0.0;
    int currentBufferSize = 0;

    JUCE_DECLARE_NON_COPYABLE_WITH_LEAK_DETECTOR(MainComponent)
};