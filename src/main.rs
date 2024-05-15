use axum::{
    extract::{Path, State},
    http::StatusCode,
    response::{Html, IntoResponse, Response},
    routing::get,
    Router,
};
use jotdown::Render;
fn main() {
    println!("Hello, world!");
}
async fn parser(State(state): State<AppState>, Path(page): Path<String>) -> impl IntoResponse {
    let mut file = format!("content/{page}.md");

    let markdown_input = match tokio::fs::read(file).await {
        Ok(res) => res,
        Err(_) => return Html("Couldn't find this page - does it exist?".to_string()),
    };

    let string_output = std::str::from_utf8(&markdown_input).unwrap();
    let mut html_output = String::new();
    let parser = jotdown::Parser::new(string_output); 
    
    jotdown::html::Renderer::default().push(&parser, &mut html_output);

    Html(html_output)
}
