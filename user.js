function ExtractUrl(param) {
  const UrlReader = new URLSearchParams(window.location.search);
  return UrlReader.get(param);
}

const UserId = ExtractUrl("u");
