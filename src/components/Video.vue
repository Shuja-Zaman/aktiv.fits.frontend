<template>
  <div class="lg:px-10 p-2 mt-5 video-container w-full lg:h-screen h-[70vh]">
    <video
      class="video-player rounded-3xl w-full"
      muted
      autoplay
      src="https://player.vimeo.com/progressive_redirect/playback/915350257/rendition/1080p/file.mp4?loc=external&signature=768f26c5396775e76c340cb808a897a724e78acb8231106dd94af9d732695176"
    ></video>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer'
};
</script>

<style scoped>
.video-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
}

.video-player {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
