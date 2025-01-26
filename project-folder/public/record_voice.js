const recordButton = document.getElementById('record');
const stopButton = document.getElementById('stop');
const audioPreview = document.getElementById('audio-preview');

let mediaRecorder;
let audioChunks = [];

recordButton.addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);
  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    const audioUrl = URL.createObjectURL(audioBlob);
    audioPreview.src = audioUrl;

    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    await fetch('/upload', { method: 'POST', body: formData });
    alert('Audio uploaded successfully!');
  };

  mediaRecorder.start();
  recordButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
  mediaRecorder.stop();
  recordButton.disabled = false;
  stopButton.disabled = true;
});
