#include "MainComponent.h"
using namespace juce;

//==============================================================================
MainComponent::MainComponent()
{
    setSize(800, 600);

    // 1. 初期化 & 2. ASIO切り替え & 3. QUAD-CAPTURE設定
    // (※ここは元のコードのままでOKです。起動時のデフォルト設定として機能します)
    deviceManager.initialise(2, 2, nullptr, true);
    deviceManager.setCurrentAudioDeviceType("ASIO", true);

    AudioDeviceManager::AudioDeviceSetup setup;
    deviceManager.getAudioDeviceSetup(setup);

    // ASIOドライバの中から "QUAD-CAPTURE" を探す

    String targetDeviceName = "";
    for (auto* type : deviceManager.getAvailableDeviceTypes())
    {
        if (type->getTypeName() == "ASIO device: ")
        {
            StringArray names = type->getDeviceNames();
            for (auto& n : names)
            {
                Logger::writeToLog("ASIO device: " + n);
                // "QUAD" または "CAPTURE" が含まれる名前を探す
                if (n.containsIgnoreCase("QUAD") || n.containsIgnoreCase("CAPTURE"))
                {
                    targetDeviceName = n;
                }
            }
        }
    }



    if (targetDeviceName.isNotEmpty())
    {
        setup.inputDeviceName = targetDeviceName;
        setup.outputDeviceName = targetDeviceName;
    }
    else
    {
        // 見つからない場合は現在の名前（デフォルト）を使う
        // (QUAD-CAPTURE以外のASIOが選ばれている可能性への保険)
        Logger::writeToLog("Warning: QUAD-CAPTURE not found explicitly.");
    }

    // 設定適用
    String error = deviceManager.setAudioDeviceSetup(setup, true);
    if (!error.isEmpty())
        Logger::writeToLog("Audio setup error: " + error);

    // 現在の設定を保存
    if (auto* device = deviceManager.getCurrentAudioDevice())
    {
        currentDeviceName = device->getName();
        currentSampleRate = device->getCurrentSampleRate();
        currentBufferSize = device->getCurrentBufferSizeSamples();
    }

    // ★★★ 重要変更点 ★★★
    setAudioChannels(2, 2);

    // ==============================================================================
    // ★ここに追加: AudioDeviceSelectorComponent の作成
    // ==============================================================================

    // 引数: deviceManager, 入力ch最小, 入力ch最大, 出力ch最小, 出力ch最大, MIDI入力表示, MIDI出力表示, ステレオペア表示, 詳細隠すボタン
    audioSettingsComp = std::make_unique<AudioDeviceSelectorComponent>(
        deviceManager, // 共通のDeviceManagerを渡すことで連携する
        0, 256,        // Input Ch (0〜256)
        0, 256,        // Output Ch (0〜256)
        false,         // MIDI Inputは一旦非表示
        false,         // MIDI Output非表示
        false,         // ステレオペアではなく個別に表示
        false          // 詳細設定は隠さない
    );

    // 画面に追加して表示させる
    addAndMakeVisible(audioSettingsComp.get());
}

MainComponent::~MainComponent()
{
    // ★追加: コンポーネントを安全に破棄するためにnullptrを入れる
    audioSettingsComp = nullptr;

    shutdownAudio();
}

//==============================================================================
void MainComponent::prepareToPlay(int samplesPerBlockExpected, double sampleRate)
{
    juce::Logger::writeToLog("Audio Started: " + String(sampleRate));
}

void MainComponent::getNextAudioBlock(const AudioSourceChannelInfo& bufferToFill)
{


    // 入力ポインタ取得 (Input 1 & Input 2)
    // setAudioChannels(2, 2) なので、0と1両方が有効です
    auto* input0 = bufferToFill.buffer->getReadPointer(0, bufferToFill.startSample);
    auto* input1 = bufferToFill.buffer->getReadPointer(1, bufferToFill.startSample);

    // 出力ポインタ取得
    auto* outputL = bufferToFill.buffer->getWritePointer(0, bufferToFill.startSample);
    auto* outputR = bufferToFill.buffer->getWritePointer(1, bufferToFill.startSample);

    for (int i = 0; i < bufferToFill.numSamples; ++i)
    {
        // ★重要: Input 1 と Input 2 を足し合わせる（ミックス）
        // これなら、どっちの穴にギターを挿していても音が出ます！
        float inL = input0[i];
        float inR = input1[i]; // もし入力2がなければここは0になるので安全

        float drySignal = inL + inR;

        // --- エフェクト処理 ---
        float processedSignal = drySignal;

        if (processedSignal > 0.3f) processedSignal = 0.3f;
        if (processedSignal < -0.3f) processedSignal = -0.3f;
        processedSignal *= 2.0f;

        // 出力
        outputL[i] = processedSignal;
        outputR[i] = processedSignal;
    }
}

void MainComponent::releaseResources()
{
}

void MainComponent::paint(juce::Graphics& g)
{
    g.fillAll(juce::Colours::darkgrey);

    // 背景のテキスト（設定画面の下に隠れるかもしれませんが、残しておきます）
    g.setColour(juce::Colours::white);
    g.setFont(20.0f);

    // 設定画面と被らないように少し下に表示位置をずらします
    g.drawText("Audio Active: " + currentDeviceName,
        getLocalBounds().removeFromBottom(50), // 下部50pxに表示
        Justification::centred, true);
}

void MainComponent::resized()
{
    // ==============================================================================
    // ★ここに追加: 設定画面のレイアウト（サイズと位置）
    // ==============================================================================
    if (audioSettingsComp)
    {
        // 画面の上の方に設定画面を配置 (余白10px)
        audioSettingsComp->setBounds(10, 10, getWidth() - 20, 300);
    }
}