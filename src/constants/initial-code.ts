export const INITIAL_CODE_CONFIG_EDITOR_PREVIEW = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Example description">
  <title>Example Title</title>

  <style>
    /* Example styles */
    .example-class {
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f2f2f2;
      border: 1px solid #ddd;
    }
    input[type="text"] {
      color: red;
    }
    footer {
      color: green;
    }
    #example-header {
      color: red;
    }
    #example-id {
      color: blue;
    }
    #example-footer {
      color: green;
    }
  </style>
</head>

  <body>
    <header id="example-header">
      <h1>Example Title</h1>
    </header>

    <section id="example-id" class="example-class">
      <h2>Example Section Title</h2>
      <p>Example text: this is a sample paragraph for demonstration purposes.</p>
    </section>

    <section id="example-id" class="example-class">
      <h3>Example Section Title</h3>
      <input type="text" placeholder="Enter your text here">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis necessitatibus facere architecto, laboriosam asperiores magnam eos iste cum laudantium culpa fuga quia? Ipsa sunt, voluptates non mollitia ullam rerum omnis? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas nisi repellendus sapiente sint, eveniet dolorum nemo quas, mollitia, magnam fuga optio. A ex nostrum architecto voluptates dolores minus atque ratione.</p>
    </section>

    <footer>
      <p>Example footer text</p>
    </footer>

    <script>
      // Example script
      document.getElementById('example-header').innerHTML = 'Hi there!';
      document.getElementById('example-id').innerHTML = 'This is a sample paragraph for demonstration purposes.';
      document.getElementById('example-footer').innerHTML = 'Example footer text';
      console.log('Text edited!');
    </script>
  </body>
</html>`;