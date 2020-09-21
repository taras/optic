use std::thread;
use std::{fs::File, io::BufWriter};
use tracing_flame::FlameLayer;
use tracing_subscriber::{fmt, prelude::*, registry::Registry};

pub fn setup_global_subscriber() -> impl Drop {
  let fmt_layer = fmt::Layer::default();
  let current_thread = thread::current();
  let thread_id = current_thread.name().expect("expected thread to have a name");
  let output_file = format!("./tracing.folded");
  let (flame_layer, _guard) = FlameLayer::with_file(output_file).unwrap();

  tracing_subscriber::registry()
    .with(fmt_layer)
    .with(flame_layer)
    .init();
  _guard
}
