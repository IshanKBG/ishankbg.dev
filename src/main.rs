
use std::fs::File;
use std::io::Read;
use std::str::from_utf8;
use regex::Regex;
fn parse_tweet_link(text: &str) -> Vec<(String, String)> {
  let re = Regex::new(r"https?://twitter.com/(?P<username>[^/]+)/status/(?P<tweet_id>\d+)").unwrap();
  let captures = re.captures_iter(text);

  let mut results = Vec::new();
  for cap in captures {
    let username = cap.name("username").unwrap().as_str().to_owned();
    let tweet_id = cap.name("tweet_id").unwrap().as_str().to_owned();
    results.push((username, tweet_id));
  }
  results
}

fn parse_markdown_to_html(file_path: &str) -> Result<String, String> {
  let mut file = match File::open(file_path) {
    Ok(f) => f,
    Err(err) => return Err(format!("Error opening file: {}", err)),
  };

  let mut content = Vec::new();
  match file.read_to_end(&mut content) {
    Ok(_) => (),  // No specific action needed in successful read
    Err(err) => return Err(format!("Error reading file: {}", err)),
  }

  let string_content = match from_utf8(&content) {
    Ok(s) => s,
    Err(err) => return Err(format!("Invalid UTF-8 content: {}", err)),
  };

  let mut html_output = markdown::to_html_with_options(
            string_content,
            &markdown::Options::gfm()
        );

  Ok(html_output.unwrap())
}

fn main() {
  let file_path = "content/react-server-components-a-bad-idea.md";
  let markdown = parse_markdown_to_html(file_path).unwrap(); 
  println!("{}", &markdown);
  let tweet_links = parse_tweet_link(&markdown);
  if tweet_links.is_empty() {
    println!("No tweet links found");
  } else {
    println!("Found tweet links:");
    for (username, tweet_id) in tweet_links.iter() {
      println!("  Username: {}", username);
      println!("  Tweet ID: {}", tweet_id);
    }
  }
}

