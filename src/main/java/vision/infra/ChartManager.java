package vision.infra;

import java.awt.Color;
import java.awt.FontMetrics;
import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayDeque;
import java.util.Collections;
import java.util.Deque;
import java.util.List;

import javax.imageio.ImageIO;
import javax.swing.JPanel;

import org.apache.commons.codec.binary.Base64;

public class ChartManager {
	private static final int PADDING = 75;
	private static final int OFFSET = 150;
	JPanel container;
	BufferedImage image;
	Graphics2D graphic;
	
	public ChartManager(int width, int height) {
		this.container = new JPanel();
		this.container.setSize(width, height);
		this.image = new BufferedImage(container.getWidth(), container.getWidth(), BufferedImage.TYPE_INT_RGB);
		this.graphic = this.image.createGraphics();
		RenderingHints antialiasingHint = new RenderingHints(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		graphic.setRenderingHints(antialiasingHint);
	}
	
	public String drawPie(String title, List<Slice> slices) throws IOException {
		cleanGraphic();
		paintGraphic(title, slices);
		return generatePNGWithBase64();
	}

	private void cleanGraphic() {
		graphic.setColor(Color.white);
		graphic.fillRect(0, 0, (int) container.getWidth(), (int) container.getHeight());
	}
	
	private void paintGraphic(String title, List<Slice> slices) {
		paintTitle(title);
		calculateAngleOfEachSlice(slices);
		setColorOfEachSlice(slices);
		drawArcOfEachSlice(slices);
		plotLegendOfEachSlice(slices);
		container.paintAll(graphic);
	}
	
	private void paintTitle(String title) {
		graphic.setColor(Color.black);
		int titleX = 20;
		int titleY = 20;
		if (graphic.getFontMetrics().stringWidth(title) + titleX < container.getWidth()) {
			graphic.drawString(title, titleX, titleY);
			return;
		}
		FontMetrics fm = graphic.getFontMetrics();
		int lineHeight = fm.getHeight();
		String[] words = title.split(" ");
		for (String word : words) {
			int wordWidth = fm.stringWidth(word + " ");
			if (titleX + wordWidth >= 0 + container.getWidth()) {
				titleY += lineHeight;
				titleX = 0;
			}
			if (titleY > 70) break;
			graphic.drawString(word, titleX, titleY);
			titleX += wordWidth;
		}
	}

	private void calculateAngleOfEachSlice(List<Slice> slices) {
		int totalAngle = 0;
		for(Slice slice : slices) {
			slice.setAngle((int) (slice.getValue() * 360 / 100));
			totalAngle += slice.getAngle();
		}
		int remainder = 360 - totalAngle;
		Collections.sort(slices);
		if (slices.size() > 0) slices.get(0).setAngle(slices.get(0).getAngle() + remainder);
	}

	private void setColorOfEachSlice(List<Slice> slices) {
		Deque<Color> colors = loadColors();
		for(Slice slice : slices) {
			if (slice.getAngle() == 0) continue;
			if (colors.isEmpty()) colors = loadColors();
			slice.setColor(colors.poll());
		}
	}

	private void drawArcOfEachSlice(List<Slice> slices) {
		int startAngle = 0;
		for(Slice slice : slices) {
			if (slice.getAngle() == 0) continue;
			graphic.setColor(slice.getColor());
			graphic.fillArc(PADDING, PADDING, container.getWidth() - OFFSET, container.getHeight() - OFFSET, startAngle, slice.getAngle());
			startAngle += slice.getAngle();
		}
	}
	
	private void plotLegendOfEachSlice(List<Slice> slices) {
		int legendInitialWidth = 30;
		int legendInitialHeight = container.getHeight() - 60;
		for(Slice slice : slices) {
			if (slice.getAngle() == 0) continue;
			graphic.setColor(slice.getColor());
			String legendText = slice.getDescription() + " (" + slice.getValue() + "%)";
			
			int legendActualWidth = graphic.getFontMetrics().stringWidth(legendText) + 35;
			if (legendInitialWidth + legendActualWidth > container.getWidth()) {
				legendInitialWidth = 30;
				legendInitialHeight += 15;
			}
			
			graphic.fillRect(legendInitialWidth, legendInitialHeight, 15, 12);
			graphic.setColor(Color.black);
			graphic.drawString(legendText, legendInitialWidth + 20, legendInitialHeight + 10);
			legendInitialWidth += legendActualWidth;			
		}
	}
	
	private String generatePNGWithBase64() throws IOException, UnsupportedEncodingException {
		ByteArrayOutputStream os = new ByteArrayOutputStream();
		ImageIO.write(image, "png", os);
		return new String(new Base64().encode(os.toByteArray()), "UTF-8");
	}

	private Deque<Color> loadColors() {
		Deque<Color> colors = new ArrayDeque<Color>();
		colors.add(new Color(124, 181, 236));
		colors.add(new Color(67, 67, 72));
		colors.add(new Color(144, 237, 125));
		colors.add(new Color(247, 163, 92));
		colors.add(new Color(241, 92, 128));
		colors.add(new Color(128, 133, 233));
		colors.add(new Color(228, 211, 84));
		colors.add(new Color(43, 144, 143));
		colors.add(new Color(244, 91, 91));
		colors.add(new Color(145, 232, 225));
		return colors;
	}
}