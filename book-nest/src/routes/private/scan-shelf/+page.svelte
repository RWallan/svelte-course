
<h2 class="mt-m mb-l">Take a picture to add books</h2>
<div class="upload-area">
	<div class="upload-container">
		<Dropzone
			on:drop={() => {}}
			multiple={false}
			accept="image/*"
			maxSize={10 * 1024 * 1024}
			containerClasses={'dropzone-cover'}
		>
			<Icon icon="bi:camera-fill" width={'40'} />
			<p>Drag a picture here or click to select a file.</p>
		</Dropzone>
	</div>
</div>
